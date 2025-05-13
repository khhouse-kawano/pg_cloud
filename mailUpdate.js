import { chromium } from 'playwright';
import fs from 'fs';
import csv from "csv-parser";


const records = [];
fs.createReadStream('mailList.csv').pipe(csv()).on("data", (row) => {
    records.push(row);
})
.on("end", async () => {
    console.log(records);

    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext();
    const loginPage = await context.newPage();
    await loginPage.goto('https://pg-cloud.jp/login');
    await loginPage.fill('#form_email', "mkt@kh-house.jp");
    await loginPage.fill('#form_password', "password");
    await loginPage.click('//html/body/main/div/form[1]/div/div[2]/input[2]');
    await loginPage.waitForLoadState('networkidle');
    await loginPage.click('//html/body/main/div/div[2]/div[1]/div[1]/div[2]/a');
    await loginPage.waitForLoadState('networkidle');
    await loginPage.close(); // ログインページを閉じる
    for (const record of records) {
        const { id, mail, name } = record;
    
        if (mail === "true") {
            try {
                const page = await context.newPage();
    
                await page.goto(`https://pg-cloud.jp/customers/${id}/summary`);
                await page.waitForLoadState('networkidle');
                await page.click('//html/body/main/div/div[2]/div/form/div[1]/div[2]/div[3]/div[2]'); // 営業メール配信設定のリストを出す
                await page.click('div[data-label="購読停止"]');
                await page.click('//html/body/main/div/div[2]/div/form/div[3]/div[2]/div/button[1]'); // 保存
                await page.waitForLoadState('networkidle');
                await page.close();
    
                console.log(`${name}様を購読停止に変更しました`);
            } catch (error) {
                console.error(`エラーが発生しました: ${name}様の処理に失敗しました`, error.message);
            }
        }
    }
    
    await browser.close();
})