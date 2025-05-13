import { GoogleSpreadsheet } from "google-spreadsheet";
import env from 'dotenv';
env.config();
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const secrets = require('./pg-cloud-441406-ae7849d9dbce.json');

export async function getSheetData() {
    const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID);

    await doc.useServiceAccountAuth({
        client_email: secrets.client_email,
        private_key: secrets.private_key
    });

    await doc.loadInfo();

    const sheet = doc.sheetsByTitle['新DB'];
    await sheet.loadCells();
    const rows = await sheet.getRows();
    const rowValues = [];

    for (let i = 1; i <= rows.length; i++) {
        let connection = sheet.getCell(i, 16);
        if (connection.value !== "〇") {
            let cell = {
                date: sheet.getCell(i, 0).value,
                medium: sheet.getCell(i, 1).value,
                firstName: sheet.getCell(i, 2).value,
                lastName: sheet.getCell(i, 3).value,
                firstKana: sheet.getCell(i, 4).value,
                lastKana: sheet.getCell(i, 5).value,
                mobile: sheet.getCell(i, 6).value,
                landline: sheet.getCell(i, 7).value,
                mail: sheet.getCell(i, 8).value,
                zip: sheet.getCell(i, 9).value,
                pref: sheet.getCell(i, 10).value,
                city: sheet.getCell(i, 11).value,
                town: sheet.getCell(i, 12).value,
                street: sheet.getCell(i, 13).value,
                building: sheet.getCell(i, 14).value,
                shop: sheet.getCell(i, 15).value,
                flag: sheet.getCell(i, 16).value,
                rowIndex : i
            };
            rowValues.push(cell);
        }
    }

    return rowValues;
}



export async function setRegisteredFlag(rowIndex) {
    const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID);
    await doc.useServiceAccountAuth({
        client_email: secrets.client_email,
        private_key: secrets.private_key
    });
    await doc.loadInfo();
    const sheet = doc.sheetsByTitle['新DB'];
    // 必要な範囲のセルをロード
    const rowCount = sheet.rowCount;
    await sheet.loadCells(`A1:Q${rowCount}`);
    
    sheet.getCell(rowIndex, 16).value = '〇';
    await sheet.saveUpdatedCells();
}




export async function getUploadData() {
    const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID);

    await doc.useServiceAccountAuth({
        client_email: secrets.client_email,
        private_key: secrets.private_key
    });

    await doc.loadInfo();

    const sheet = doc.sheetsByTitle['アップロード用'];
    await sheet.loadCells();
    const rows = await sheet.getRows();
    const rowValues = [];

    for (let i = 1; i <= rows.length; i++) {
        let connection = sheet.getCell(i, 31);
        if (connection.value !== "〇") {
            let cell = {
                medium: sheet.getCell(i,30).value,
                estate: sheet.getCell(i,1).value,
                sei: sheet.getCell(i,2).value,
                mei: sheet.getCell(i,3).value,
                seiKana: sheet.getCell(i,4).value,
                meiKana: sheet.getCell(i,5).value,
                landline: sheet.getCell(i,6).value,
                mobile: sheet.getCell(i,7).value,
                mail: sheet.getCell(i,8).value,
                sex: sheet.getCell(i,9).value,
                birthday: sheet.getCell(i,10).value,
                employment: sheet.getCell(i,11).value,
                companyName: sheet.getCell(i,12).value,
                companyAddress: sheet.getCell(i,13).value,
                companyYears: sheet.getCell(i,14).value, 
                income: sheet.getCell(i,15).value,
                zip: sheet.getCell(i,16).value,
                address: sheet.getCell(i,17).value,
                rent: sheet.getCell(i,18).value,
                budget: sheet.getCell(i,19).value,
                contract: sheet.getCell(i,20).value,
                repayment: sheet.getCell(i,21).value,
                debt: sheet.getCell(i,22).value,
                notes: sheet.getCell(i,23).value,
                shop: sheet.getCell(i,24).value,
                staff:sheet.getCell(i,25).value,
                junior: sheet.getCell(i,26).value,
                senior: sheet.getCell(i,27).value,
                roster: sheet.getCell(i,28).value,
                interview: sheet.getCell(i,29).value,
                rowIndex : i
            };
            rowValues.push(cell);
        }
    }

    return rowValues;
}



export async function setUploadedFlag(rowIndex) {
    const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID);
    await doc.useServiceAccountAuth({
        client_email: secrets.client_email,
        private_key: secrets.private_key
    });
    await doc.loadInfo();
    const sheet = doc.sheetsByTitle['アップロード用'];
    // 必要な範囲のセルをロード
    const rowCount = sheet.rowCount;
    await sheet.loadCells(`A1:AF${rowCount}`);
    
    sheet.getCell(rowIndex, 31).value = '〇';
    await sheet.saveUpdatedCells();
}