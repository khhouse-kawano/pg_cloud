import { GoogleSpreadsheet } from "google-spreadsheet";
import env from 'dotenv';
env.config();
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const secrets = require('./pg-cloud-441406-ae7849d9dbce.json');

export async function getSheetData(){

// export async function getSheetData(){
    const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID);

    await doc.useServiceAccountAuth({
        client_email: secrets.client_email,
        private_key: secrets.private_key
    });

    await doc.loadInfo();

    const sheet = doc.sheetsByTitle['新DB'];
    await sheet.loadCells();
    const rows = await sheet.getRows();
    const colCount = sheet.columnCount;
    const rowValues = [];
    for ( let i = 0; i <= rows.length; i++){
        let cell = {
            Date : sheet.getCell(i, 0).value,
            FirstName : sheet.getCell(i, 2).value,
            LastName : sheet.getCell(i, 3).value
        };
        rowValues.push(cell);
    }
    for (let rowValue of rowValues){
        console.log(rowValue)
    };
} ;

// getSheetData();
