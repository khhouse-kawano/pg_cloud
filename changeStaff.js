import { chromium } from 'playwright';
import { writeFileSync } from 'fs';
import { Post } from './post.js'


(async () => {
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();

    let page = await context.newPage();
    await page.goto('https://pg-cloud.jp/login');
    await page.fill('#form_email', "mkt@kh-house.jp");
    await page.fill('#form_password', "password");
    await page.click('//html/body/main/div/form[1]/div/div[2]/input[2]');
    await page.waitForLoadState('networkidle');
    await page.click('//html/body/main/div/div[2]/div[1]/div[1]/div[2]/a');
    await page.waitForLoadState('networkidle');



    await page.goto('https://pg-cloud.jp/customers?q%5Bcategories%5D=all&q%5Bstatuses%5D=prospective&q%5Bin_charge_store_id%5D=01JACD5YJD9EFECBNY0QSNEBB6&q%5Bcurrent_contract_types%5D=all&is_table_scroll_required=true&column_settings=customer_contacts_name%2Cin_charge_store%2Cin_charge_user%2Creaction_date%2Cfirst_interviewed_date%2Cfull_address%2Csales_promotion_name&per_page=100&page=1');
    await page.waitForSelector('body > main > div > div.table > div.table-pagers > div.table-pagers-left > div.table-pagers-label > div > span');    
    const listCount = await page.$eval('//html/body/main/div/div[4]/div[2]/div[1]/div[1]/div/span', el => el.innerText.trim());
    const listPage = Math.ceil(listCount / 100);
    console.log(`顧客数:${listCount}、ページ総数:${listPage}`);
    for( let i = 0; i < listPage ; i ++){
        await page.goto(`https://pg-cloud.jp/customers?q%5Bcategories%5D=all&q%5Bstatuses%5D=prospective&q%5Bin_charge_store_id%5D=01JACD5YJD9EFECBNY0QSNEBB6&q%5Bcurrent_contract_types%5D=all&is_table_scroll_required=true&column_settings=customer_contacts_name%2Cin_charge_store%2Cin_charge_user%2Creaction_date%2Cfirst_interviewed_date%2Cfull_address%2Csales_promotion_name&per_page=100&page=${ i + 1}`);
        console.log( `${ i + 1 }ページ目を取得中...`)
        const maxList = listPage - 1 === i ? listCount - ( listPage - 1 ) * 100 : 100 ;
        for ( let e = 0; e < maxList; e ++){
            const targetDate = await page.$eval(`//html/body/main/div[1]/div[4]/div[3]/table/tbody/tr[${ e + 1 }]/td[5]`, el => el.innerText.trim());
            const targetStaff = await page.$eval(`//html/body/main/div[1]/div[4]/div[3]/table/tbody/tr[${ e + 1 }]/td[4]`, el => el.innerText.trim());
            console.log(`${targetDate}_${targetStaff}`)
                if ( targetDate.includes('2025年') || targetStaff.includes('管理')) continue;            
                    const href = await page.locator(`xpath=/html/body/main/div[1]/div[4]/div[3]/table/tbody/tr[${ e + 1 }]/td[2]/a`).getAttribute('href');
                    console.log(href);
                    await page.goto(`https://pg-cloud.jp${href}`);
                    await page.waitForSelector('#customer_customized_input_select_99 > div.input-select-search-field-wrapper > input');
                    const targetRank = await page.$eval('//html/body/main/div[1]/div[2]/div/form/div[1]/div[2]/div[1]/div[2]/div/div[1]/input', el => el.innerText.trim());
                    if ( targetRank.includes('Aランク') || targetRank.includes('Bランク')) {
                        console.log(`${targetRank}のため未処理`);
                        await page.goBack();
                        await page.waitForSelector('body > main > div.customers-index > div.table > div.table-pagers > div.table-pagers-left > div.table-pagers-label > div > span');
                    };          
                    const targetName = await page.$eval('//html/body/main/div[1]/div[2]/div/form/div[1]/div[2]/div[1]/div[2]/div/div[1]/input', el => el.innerText.trim());
                    console.log(`${targetRank}_${targetName}`)
                    await page.click('//html/body/main/div[1]/div[2]/div/form/div[1]/div[2]/div[2]/div[2]/div');
                    await page.click(`div[data-label="KH延岡店 管理"]`);
                    await page.click('//html/body/main/div/div[2]/div/form/div[3]/div[2]/div/button'); // 登録ボタン
                    await page.waitForLoadState('networkidle');

                    await page.goBack();
                    await page.waitForSelector('body > main > div.customers-index > div.table > div.table-pagers > div.table-pagers-left > div.table-pagers-label > div > span');
            }
    }


    await browser.close();
    const endTime = new Date();
    console.log(`finish searching at ${endTime}`);
})();

