import { getSheetData, setRegisteredFlag } from './sheetData.mjs';
import { chromium } from 'playwright';
import env from 'dotenv';
env.config();
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const secrets = require('./pg-cloud-441406-ae7849d9dbce.json');

async function main(mail, password) {
    try {
        const rowValues = await getSheetData();
        const browser = await chromium.launch({ headless: true });

        for (let rowValue of rowValues) {
            const page = await browser.newPage();
            page.setDefaultTimeout(600000); // 10分にタイムアウトを設定
            await login(page, mail, password);
            await fillForm(page, rowValue);
            await saveData(page, rowValue);
            await page.close();
            // 登録完了後、Google Spreadsheetに登録済みフラグを立てる
            await setRegisteredFlag(rowValue.rowIndex);
        }

        await browser.close();
    } catch (error) {
        console.error('データの取得中にエラーが発生しました:', error);
    }
}

async function login(page, mail, password) {
    await page.goto('https://pg-cloud.jp/login');
    await page.fill('#form_email', mail);
    await page.fill('#form_password', password);
    await page.click('//html/body/main/div/form[1]/div/div[2]/input[2]');
    await page.waitForLoadState('networkidle');
}

async function fillForm(page, rowValue) {
    await page.click('//html/body/main/div/div[2]/div[1]/div[2]/div[7]/a');
    await page.waitForLoadState('networkidle');
    await page.click('//html/body/main/div/div[2]/div/form/div[1]/div[3]/div[3]/div/div/div[1]'); // 販促媒体名のリストを出す
    if (rowValue.medium) await page.click(`div[data-label="${rowValue.medium}"]`);
    if (rowValue.firstName) await page.fill('//html/body/main/div/div[2]/div/form/div[1]/div[4]/div[1]/div[2]/input[1]', String(rowValue.firstName)); // 姓
    if (rowValue.lastName) await page.fill('//html/body/main/div/div[2]/div/form/div[1]/div[4]/div[1]/div[2]/input[2]', String(rowValue.lastName)); // 名
    if (rowValue.firstKana) await page.fill('//html/body/main/div/div[2]/div/form/div[1]/div[5]/div[1]/div[2]/input[1]', String(rowValue.firstKana)); // セイ
    if (rowValue.lastKana) await page.fill('//html/body/main/div/div[2]/div/form/div[1]/div[5]/div[1]/div[2]/input[2]', String(rowValue.lastKana)); // メイ
    await page.click('//html/body/main/div/div[2]/div/form/div[1]/div[6]/div[1]/div[2]/div[1]'); // 連絡先入力画面を出す
    if (rowValue.mobile) await page.fill('//html/body/main/div/div[2]/div/form/div[1]/div[6]/div[1]/div[2]/div[2]/div[2]/div[1]/div[1]/div[2]/input', String(rowValue.mobile)); // 携帯電話
    if (rowValue.landline) await page.fill('//html/body/main/div/div[2]/div/form/div[1]/div[6]/div[1]/div[2]/div[2]/div[2]/div[1]/div[2]/div[2]/input', String(rowValue.landline)); // 固定電話
    if (rowValue.mail) await page.fill('//html/body/main/div/div[2]/div/form/div[1]/div[6]/div[1]/div[2]/div[2]/div[2]/div[1]/div[3]/div[2]/input', String(rowValue.mail)); // Eメール
    await page.click('//html/body/main/div/div[2]/div/form/div[1]/div[6]/div[1]/div[2]/div[2]/div[2]/div[2]/button[1]'); // 連絡先入力画面を閉じる
    await page.click('//html/body/main/div/div[2]/div/form/div[1]/div[6]/div[2]/div[2]/div[1]'); // 住所入力画面を出す
    if (rowValue.zip) {
        await page.fill('//html/body/main/div/div[2]/div/form/div[1]/div[6]/div[2]/div[2]/div[2]/div[2]/div[1]/div/div[2]/div/div[1]/div[1]/input', String(rowValue.zip)); // 郵便番号
        await page.click('//html/body/main/div/div[2]/div/form/div[1]/div[6]/div[2]/div[2]/div[2]/div[2]/div[1]/div/div[2]/div/div[1]/div[2]/a'); // 郵便番号検索ボタン
        await page.waitForTimeout(1500);
    }
    if (rowValue.street) await page.fill('//html/body/main/div/div[2]/div/form/div[1]/div[6]/div[2]/div[2]/div[2]/div[2]/div[1]/div/div[2]/div/div[5]/div/input', String(rowValue.street)); // 番地
    if (rowValue.building) await page.fill('//html/body/main/div/div[2]/div/form/div[1]/div[6]/div[2]/div[2]/div[2]/div[2]/div[1]/div/div[2]/div/div[6]/div/input', String(rowValue.building)); // 建物
    await page.click('//html/body/main/div/div[2]/div/form/div[1]/div[6]/div[2]/div[2]/div[2]/div[2]/div[2]/button[1]'); // 住所入力画面を閉じる
    await page.click('//html/body/main/div/div[2]/div/form/div[3]/div[2]/div/button'); // 登録ボタン
    await page.waitForTimeout(4500); // 4秒待機 ※詳細編集画面が現れないため
}

async function saveData(page, rowValue) {
    await page.click('//html/body/main/div/div[2]/div/form/div[3]/div[2]/div/a[1]'); // 詳細編集画面へ
    await page.waitForSelector('//html/body/main/div/div[3]/form/div[3]/div[1]/div[8]/div[1]'); // element
    await page.click('//html/body/main/div/div[3]/form/div[3]/div[1]/div[8]/div[1]'); // 店舗ドロップダウンを表示
    await page.waitForTimeout(1000); // 1秒待機
    await page.fill('//html/body/main/div/div[3]/form/div[3]/div[1]/div[8]/div[1]/input', String(rowValue.shop)); // 店舗名を入力
    if (rowValue.shop) {
        await page.click(`div[data-label="${rowValue.shop}"]`);
        const selectedShop = await page.$eval('//html/body/main/div/div[3]/form/div[3]/div[1]/div[8]/div[1]/input', el => el.value);
        if (selectedShop === "") {
            await page.fill('//html/body/main/div/div[3]/form/div[3]/div[1]/div[8]/div[1]/input', String(rowValue.shop));
            await page.click(`div[data-label="${rowValue.shop}"]`);
        }
    }
    if (rowValue.date) {
        let formattedDate = rowValue.date.replace(/\//g, '-');
        await page.fill('//html/body/main/div/div[3]/form/div[3]/div[6]/table/tbody/tr[1]/td[1]/input', formattedDate);
        await page.fill('//html/body/main/div/div[3]/form/div[3]/div[6]/table/tbody/tr[1]/td[2]/input', formattedDate);
    }
    await page.waitForTimeout(500); // 少しだけ待機
    await page.click('//html/body/main/div/div[3]/form/div[5]/div[2]/div[2]/div[1]/button'); // 保存ボタン
    console.log(`${rowValue.firstName}${rowValue.lastName}様のデータを保存しました`);
}

const pg_mail = process.env.MAIL;
const pg_pass = process.env.PASS;

main(pg_mail, pg_pass);
