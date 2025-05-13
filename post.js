import axios from "axios";
import fs from "fs";
import csv from "csv-parser";

const url = 'https://khg-marketing.info/regist/update.php';

export async function Post(){
const records = [];
fs.createReadStream("database.csv").pipe(csv()).on("data", (row) => {
    records.push(row);
}).on("end", async () => {
    for (const record of records) {
        const { customer_contacts_name, id, date, reaction_date, in_charge_store, in_charge_user, first_interviewed_date, status, customized_input_01J82Z5F366ZQ897PXWF6H5ZAM, has_owned_land, place, budget, repayment_years, sales_promotion_name, step_migration_item_01J82Z5F1RR18Z792C7KZS88QG } = record;
        const data = new URLSearchParams({ customer_contacts_name, id, date, reaction_date, in_charge_store, in_charge_user, first_interviewed_date, status, customized_input_01J82Z5F366ZQ897PXWF6H5ZAM, has_owned_land, place, budget, repayment_years, sales_promotion_name, step_migration_item_01J82Z5F1RR18Z792C7KZS88QG });

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
});
}
