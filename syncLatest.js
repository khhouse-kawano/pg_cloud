import { chromium } from 'playwright';
import { writeFileSync } from 'fs';
import { Post } from './post.js'


(async () => {
    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext();
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const day = String(date.getDate() ).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    // const formattedDate = `2025-01-01`;
    console.log(`start searching at ${formattedDate}`);

  // ログイン
    let page = await context.newPage();
    await page.goto('https://pg-cloud.jp/login');
    await page.fill('#form_email', "mkt@kh-house.jp");
    await page.fill('#form_password', "password");
    await page.click('//html/body/main/div/form[1]/div/div[2]/input[2]');
    await page.waitForLoadState('networkidle');
    await page.click('//html/body/main/div/div[2]/div[1]/div[1]/div[2]/a');
    await page.waitForLoadState('networkidle');



    await page.goto(`https://pg-cloud.jp/customers?active_tab_key=etc&q%5Bcategories%5D=all&q%5Bstatuses%5D=all&q%5Bstep_migration_item_id%5D=01J82Z5F13B6QVM6X0TCWZHW99&q%5Bstep_migration_item_complete_date_start%5D=2025-01-01&q%5Bcurrent_contract_types%5D=all&q%5Bupdated_at_start%5D=${formattedDate}&is_table_scroll_required=true&column_settings=customer_contacts_name%2Cin_charge_store%2Cin_charge_user%2Creaction_date%2Cfirst_interviewed_date%2Cfull_address%2Csales_promotion_name&per_page=100&page=1`);
    const column =["id", "date"];
    const columnLenghth = await page.locator('//html/body/main/div[1]/div[4]/div[3]/table/tbody/tr[1]/td').count();
    for (let i = 1; i < columnLenghth ; i++){
        const dataKey = await page.locator(`//html/body/main/div[1]/div[4]/div[3]/table/tbody/tr[1]/td[${i + 1}]`).getAttribute('data-key');
        column.push(dataKey);
    }
    const columnArrayString=column.join(',') + '\n';
    const record = [];
    await page.waitForSelector('body > main > div > div.table > div.table-pagers > div.table-pagers-left > div.table-pagers-label > div > span');
    const listCount = await page.$eval('//html/body/main/div/div[4]/div[2]/div[1]/div[1]/div/span', el => el.innerText.trim());
    const listPage = Math.ceil(listCount / 100);
    console.log(`顧客数:${listCount}、ページ総数:${listPage}`);
    for( let i = 0; i < listPage ; i ++){
        await page.goto(`https://pg-cloud.jp/customers?active_tab_key=etc&q%5Bcategories%5D=all&q%5Bstatuses%5D=all&q%5Bstep_migration_item_id%5D=01J82Z5F13B6QVM6X0TCWZHW99&q%5Bstep_migration_item_complete_date_start%5D=2025-01-01&q%5Bcurrent_contract_types%5D=all&q%5Bupdated_at_start%5D=${formattedDate}&is_table_scroll_required=true&column_settings=customer_contacts_name%2Cin_charge_store%2Cin_charge_user%2Creaction_date%2Cfirst_interviewed_date%2Cfull_address%2Csales_promotion_name&per_page=100&page=${ i + 1}`);
        console.log( `${ i + 1 }ページ目を取得中...`)
        const maxList = listPage - 1 === i ? listCount - ( listPage - 1 ) * 100 : 100 ;
        for ( let e = 0; e < maxList; e ++){
            const id = await page.$eval(`//html/body/main/div/div[4]/div[3]/table/tbody/tr[${ e + 1 }]/td[1]/input`, el => el.value);
            const row = [id,formatDate(date)];
            for (let l = 0; l < 142; l++){
                let listVlaue = l === 3 || l === 4 ? await page.$eval(`//html/body/main/div/div[4]/div[3]/table/tbody/tr[${ e + 1 }]/td[${ l + 2}]`, el => el.innerText.trim().replace("年", "/").replace("月", "/").replace("日", "")) :await page.$eval(`//html/body/main/div/div[4]/div[3]/table/tbody/tr[${ e + 1 }]/td[${ l + 2}]`, el => el.innerText.trim()) ;
                row.push(listVlaue);
            }
            record.push(row);
            }
    }
    console.log(record);
    
    function wrapCell(cell) {
        return `"${String(cell).replace(/"/g, '""')}"`;
    }

    function arrayToCSV(arr) {
        return columnArrayString + arr.map(row => row.map(wrapCell).join(',')).join('\n');
    }


    function formatDate(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    }

    const csv = arrayToCSV(record);
    writeFileSync(`database.csv`, csv);

    await browser.close();
    const endTime = new Date();
    console.log(`finish searching at ${endTime}`);
    await Post();
})();

