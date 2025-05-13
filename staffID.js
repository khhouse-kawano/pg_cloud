import { chromium } from 'playwright';
import fs from 'fs';

(async () => {
  // ブラウザをヘッドレスモードを無効にして起動
    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext();

  // ログイン
    const loginPage = await context.newPage();
    await loginPage.goto('https://pg-cloud.jp/login');
    await loginPage.fill('#form_email', "mkt@kh-house.jp");
    await loginPage.fill('#form_password', "password");
    await loginPage.click('//html/body/main/div/form[1]/div/div[2]/input[2]');
    await loginPage.waitForLoadState('networkidle');
    await loginPage.click('//html/body/main/div/div[2]/div[1]/div[1]/div[2]/a');
    await loginPage.waitForLoadState('networkidle');
    await loginPage.close(); // ログインページを閉じる

  // すべての要素を格納する配列
    const allElements = [];

  // 複数のページにわたって並行処理
    for (let pageNum = 1; pageNum <= 3; pageNum++) {
    // ページに移動
    const page = await context.newPage();
    // 日付を2025-01-01に設定
    await page.goto(`https://pg-cloud.jp/users?is_table_scroll_required=true&page=${pageNum}`);
    await page.waitForLoadState('networkidle');
    // 1から50までループしてhrefとテキスト内容を取得し、オブジェクトを作成
    const pageElements = await Promise.all([...Array(50).keys()].map(async (i) => {

        // 行数を取得body > main > div > div.table > div.table-wrapper > table > tbody > tr:nth-child(1)
        const rowCount = await page.$$eval('body > main > div > div.table > div.table-wrapper > table > tbody > tr', rows => rows.length);

        // 行が存在しなければスキップ
        if (i >= rowCount) return null;
        const selectorHref = `//html/body/main/div/div[5]/div[2]/table/tbody/tr[${i + 1}]/td[8]/a[1]`;
        const href = await page.getAttribute(selectorHref, 'href');
        const shop = await page.$eval(`//html/body/main/div/div[5]/div[2]/table/tbody/tr[${i + 1}]/td[1]`, el => el.innerText.trim());
        const name = await page.$eval(`//html/body/main/div/div[5]/div[2]/table/tbody/tr[${i + 1}]/td[2]`, el => el.innerText.trim());
        const mail = await page.$eval(`//html/body/main/div/div[5]/div[2]/table/tbody/tr[${i + 1}]/td[3]`, el => el.innerText.trim());
        const status = await page.$eval(`//html/body/main/div/div[5]/div[2]/table/tbody/tr[${i + 1}]/td[7]`, el => el.innerText.trim());
        return {
            id: href.split('/')[2],
            name: name,
            shop: shop,
            mail: mail,
            status: status
        };
      }));

    // nullを除外してallElementsに追加
    allElements.push(...pageElements.filter(e => e !== null));
    
    await page.close(); // ページを閉じる
}

  // CSVファイルにデータを書き込む
    const csvContent = allElements.map(e => `,"${e.name}","${e.id}","${e.shop}","${e.mail}","${e.status}"`).join('\n');
    fs.writeFileSync('staffID.csv', csvContent);

  // すべてのオブジェクトを表示
    console.log(allElements);

  // ブラウザを閉じる
    await browser.close();
})();
