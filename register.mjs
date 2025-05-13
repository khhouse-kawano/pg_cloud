import {getUploadData,setUploadedFlag} from './sheetData.mjs';
import { chromium } from 'playwright';
import env from 'dotenv';
env.config();
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const secrets = require('./pg-cloud-441406-ae7849d9dbce.json');

async function main(mail,password){
    try {
        const rowValues = await getUploadData();
        for (let rowValue of rowValues){
            const browser = await chromium.launch({ headless: true });
            // headless:falseでビューモード 
            // const browser = await chromium.launch();
            const page = await browser.newPage();
            await page.goto('https://pg-cloud.jp/login');
            await page.fill('#form_email', mail);
            await page.fill('#form_password', password);
            await page.click('//html/body/main/div/form[1]/div/div[2]/input[2]');
            await page.waitForLoadState('networkidle'); 
            await page.click('//html/body/main/div/div[2]/div[1]/div[2]/div[7]/a');
            await page.waitForLoadState('networkidle');
            await page.click('//html/body/main/div/div[2]/div/form/div[1]/div[3]/div[3]/div/div/div[1]'); //販促媒体名のリストを出す
            rowValue.medium === null ? {} :await page.click(`div[data-label="${rowValue.medium}"]`);
            rowValue.sei === null ? {} :await page.fill('//html/body/main/div/div[2]/div/form/div[1]/div[4]/div[1]/div[2]/input[1]',String(rowValue.sei)); //姓
            rowValue.mei === null ? {} :await page.fill('//html/body/main/div/div[2]/div/form/div[1]/div[4]/div[1]/div[2]/input[2]',String(rowValue.mei)); //名
            rowValue.seiKana === null ? {} :await page.fill('//html/body/main/div/div[2]/div/form/div[1]/div[5]/div[1]/div[2]/input[1]',String(rowValue.seiKana)); //セイ
            rowValue.meiKana === null ? {} :await page.fill('//html/body/main/div/div[2]/div/form/div[1]/div[5]/div[1]/div[2]/input[2]',String(rowValue.meiKana)); //メイ
            await page.click('//html/body/main/div/div[2]/div/form/div[1]/div[6]/div[1]/div[2]/div[1]'); //連絡先入力画面を出す
            rowValue.mobile === null ? {} :await page.fill('//html/body/main/div/div[2]/div/form/div[1]/div[6]/div[1]/div[2]/div[2]/div[2]/div[1]/div[1]/div[2]/input',String(rowValue.mobile)); //携帯電話
            rowValue.landline === null ? {} :await page.fill('//html/body/main/div/div[2]/div/form/div[1]/div[6]/div[1]/div[2]/div[2]/div[2]/div[1]/div[2]/div[2]/input',String(rowValue.landline)); //固定電話
            rowValue.mail === null ? {} :await page.fill('//html/body/main/div/div[2]/div/form/div[1]/div[6]/div[1]/div[2]/div[2]/div[2]/div[1]/div[3]/div[2]/input',String(rowValue.mail)); //Eメール
            await page.click('//html/body/main/div/div[2]/div/form/div[1]/div[6]/div[1]/div[2]/div[2]/div[2]/div[2]/button[1]'); //連絡先入力画面を閉じる
            await page.click('//html/body/main/div/div[2]/div/form/div[1]/div[6]/div[2]/div[2]/div[1]'); //住所入力画面を出す
            rowValue.zip === null ? {} :await page.fill('//html/body/main/div/div[2]/div/form/div[1]/div[6]/div[2]/div[2]/div[2]/div[2]/div[1]/div/div[2]/div/div[1]/div[1]/input',String(rowValue.zip)); //郵便番号
            rowValue.zip === null ? {} :await page.click('//html/body/main/div/div[2]/div/form/div[1]/div[6]/div[2]/div[2]/div[2]/div[2]/div[1]/div/div[2]/div/div[1]/div[2]/a'); //郵便番号検索ボタン
            await page.waitForTimeout(1500); //
            rowValue.address === null ? {} :await page.fill('//html/body/main/div/div[2]/div/form/div[1]/div[6]/div[2]/div[2]/div[2]/div[2]/div[1]/div/div[2]/div/div[5]/div/input',String(rowValue.address)); //番地
            await page.click('//html/body/main/div/div[2]/div/form/div[1]/div[6]/div[2]/div[2]/div[2]/div[2]/div[2]/button[1]'); //住所入力画面を閉じる
            await page.waitForTimeout(1500); //
            await page.click(('//html/body/main/div/div[2]/div/form/div[1]/div[10]/div[3]/div[2]/div[1]')); //年収・勤務先の画面を出す
            await page.click('//html/body/main/div/div[2]/div/form/div[1]/div[10]/div[3]/div[2]/div[2]/div[2]/div[1]/div[1]/div[2]/div/div[1]');//勤務先情報を出す
            rowValue.employment === null ? {} :await page.click(`div[data-label="${rowValue.employment}"]`);
            rowValue.companyName === null ? {} :await page.fill('//html/body/main/div/div[2]/div/form/div[1]/div[10]/div[3]/div[2]/div[2]/div[2]/div[1]/div[2]/div[2]/input',String(rowValue.companyName)); //会社名
            rowValue.companyYears === null ? {} :await page.fill('//html/body/main/div/div[2]/div/form/div[1]/div[10]/div[3]/div[2]/div[2]/div[2]/div[1]/div[4]/div[2]/input',String(rowValue.Years)); //勤続年数
            rowValue.income === null ? {} :await page.fill('//html/body/main/div/div[2]/div/form/div[1]/div[10]/div[3]/div[2]/div[2]/div[2]/div[1]/div[5]/div[2]/input', String(rowValue.income)); //年収
            await page.click('//html/body/main/div/div[2]/div/form/div[1]/div[10]/div[3]/div[2]/div[2]/div[2]/div[2]/button[1]'); //勤務先情報を閉じる
            await page.click('//html/body/main/div/div[2]/div/form/div[1]/div[14]/div/div/div[1]'); //備考入力ボタンを開く
            rowValue.notes === null ? {} :await page.fill('//html/body/main/div/div[2]/div/form/div[1]/div[14]/div/div/div[2]/div[2]/textarea',String(rowValue.notes)); //備考入力
            await page.click('//html/body/main/div/div[2]/div/form/div[1]/div[14]/div/div/div[2]/div[2]/div/button[1]'); //備考入力ボタンを閉じる
            await page.click('//html/body/main/div/div[2]/div/form/div[3]/div[2]/div/button'); //登録ボタン
            await page.waitForTimeout(4000); //4秒待機 ※詳細編集画面が現れないため
            await page.click('//html/body/main/div/div[2]/div/form/div[3]/div[2]/div/a[1]'); //詳細編集画面へ
            await page.waitForTimeout(2000); //2秒待機 ※詳細編集画面が現れないため
            await page.click('//html/body/main/div/div[3]/form/div[3]/div[1]/div[8]/div[1]'); //店舗ドロップダウンを表示
            await page.waitForTimeout(1000); //少しだけ待機
            rowValue.shop === null ? {} :await page.click(`div[data-label="${rowValue.shop}"]`);
            await page.waitForTimeout(1000); //少しだけ待機
            await page.click('//html/body/main/div/div[3]/form/div[3]/div[1]/div[9]/div[1]'); //担当者ドロップダウンを表示
            await page.waitForTimeout(1000); //少しだけ待機
            rowValue.staff === null ? {} :await page.click(`div[data-label="${rowValue.staff}"]`);
            await page.waitForTimeout(1000); //少しだけ待機
            if (rowValue.roster) {
                let formattedDate = rowValue.roster.replace(/\//g, '-');
                await page.fill('//html/body/main/div/div[3]/form/div[3]/div[6]/table/tbody/tr[1]/td[2]/input', formattedDate);
                await page.waitForTimeout(500); //少しだけ待機
            }
            if (rowValue.interview) {
                let formattedDate = rowValue.interview.replace(/\//g, '-');
                await page.fill('//html/body/main/div/div[3]/form/div[3]/div[6]/table/tbody/tr[3]/td[2]/input', formattedDate);
                await page.waitForTimeout(500); //少しだけ待機
            }
            await page.click('//html/body/main/div/div[3]/form/div[5]/div[2]/div[2]/div[1]/button'); //保存ボタン
            await page.waitForTimeout(1000); //少しだけ待機
            await console.log(`${ rowValue.sei } ${ rowValue.mei } 様のデータを登録しました`);
            await browser.close();
            // 登録完了後、Google Spreadsheetに登録済みフラグを立てる
            await setUploadedFlag(rowValue.rowIndex);
        };
    } catch (error) {
        console.error('データの取得中にエラーが発生しました:', error);
    }
};

const pg_mail = process.env.MAIL;

const pg_pass = process.env.PASS;

main(pg_mail,pg_pass);