import axios from "axios";
import fs from "fs";
import csv from "csv-parser";

const url = 'https://khg-marketing.info/regist/registArank.php';

export async function PostRank(){
const ranks = ["Aランク", "Bランク"];
for (const rank of ranks) { 

const records = [];
fs.createReadStream(`databaseRank${ rank }.csv`).pipe(csv()).on("data", (row) => {
    records.push(row);
}).on("end", async () => {
    for (const record of records) {
        const { customer_contacts_name, id, date, reaction_date, in_charge_store, in_charge_user, first_interviewed_date, status, customized_input_01J82Z5F366ZQ897PXWF6H5ZAM, has_owned_land, place, budget, repayment_years, sales_promotion_name, step_migration_item_01J82Z5F1RR18Z792C7KZS88QG, customized_input_01J95TC6KEES87F0YXH29AJP7K, remarks, customized_input_01JSE7DKY5RYY3T8T8NVR1AJMN, step_migration_item_01JSE75MPCGQW7V2MTY9VM4HXN, step_migration_item_01JSENACS2FC422ZHEZWNSXNYA, customized_input_01JSE7RNV3VK78YC2GYAG0554D,competitors_text, step_migration_item_01JSE0CRECT96FMYTZ1ZREC3QR } = record;
        const data = new URLSearchParams({ customer_contacts_name, id, date, reaction_date, in_charge_store, in_charge_user, first_interviewed_date, status, customized_input_01J82Z5F366ZQ897PXWF6H5ZAM, has_owned_land, place, budget, repayment_years, sales_promotion_name, step_migration_item_01J82Z5F1RR18Z792C7KZS88QG, customized_input_01J95TC6KEES87F0YXH29AJP7K ,remarks, customized_input_01JSE7DKY5RYY3T8T8NVR1AJMN, step_migration_item_01JSE75MPCGQW7V2MTY9VM4HXN, step_migration_item_01JSENACS2FC422ZHEZWNSXNYA, customized_input_01JSE7RNV3VK78YC2GYAG0554D, competitors_text, step_migration_item_01JSE0CRECT96FMYTZ1ZREC3QR});

        try {
            console.log(data);
            const response = await axios.post(url, data, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });

            const responseData = response.data; 
            console.log('Raw response data:', responseData);

            let parsedData;
            try {
                parsedData = JSON.parse(responseData);
                console.log('レスポンスデータ:', parsedData.message);
            } catch (parseError) {
                console.error('受け取ったレスポンス:', responseData);
            }
        } catch (error) {
            console.error('エラー:', error.message);
            if (error.response) {
                console.error('レスポンスデータ:', error.response.data);
            }
        }
    }
});}
}
