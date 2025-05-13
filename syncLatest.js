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



    await page.goto(`https://pg-cloud.jp/customers?active_tab_key=etc&to_save_favorite_conditions=false&favorite_conditions_name=&to_delete_favorite_conditions_id=&q%5Bcategories%5D=all&q%5Bhas_owned_land%5D=&q%5Bstatuses%5D=prospective&q%5Bbrand_id%5D=&q%5Bin_charge_store_id%5D=&q%5Bin_charge_user_id%5D=&q%5Bcustomer_customized_input_values_attributes%5D%5B0%5D%5Benterprise_select_option_id%5D=&q%5Bcustomer_customized_input_values_attributes%5D%5B0%5D%5Benterprise_customized_input_id%5D=01J82Z5F366ZQ897PXWF6H5ZAM&q%5Bcustomer_customized_input_values_attributes%5D%5B1%5D%5Benterprise_select_option_id%5D=&q%5Bcustomer_customized_input_values_attributes%5D%5B1%5D%5Benterprise_customized_input_id%5D=01JSE7DKY5RYY3T8T8NVR1AJMN&q%5Bcustomer_customized_input_values_attributes%5D%5B2%5D%5Benterprise_select_option_id%5D=&q%5Bcustomer_customized_input_values_attributes%5D%5B2%5D%5Benterprise_customized_input_id%5D=01JSE7H4MQES619NBWX6PQDFRH&q%5Bcustomer_customized_input_values_attributes%5D%5B3%5D%5Benterprise_select_option_id%5D=&q%5Bcustomer_customized_input_values_attributes%5D%5B3%5D%5Benterprise_customized_input_id%5D=01JSE7RNV3VK78YC2GYAG0554D&q%5Bcustomer_contact_name%5D=&q%5Bcustomer_contact_name_kana%5D=&q%5Bcustomer_contact_birth_date_start%5D=&q%5Bcustomer_contact_birth_date_end%5D=&q%5Bpostal_code%5D=&q%5Bprefecture_id%5D=&q%5Bcity_id%5D=&q%5Btown_id%5D=&q%5Belementary_school_id%5D=&q%5Bjunior_high_school_id%5D=&q%5Blast_action_step_migration_item_id%5D=&q%5Blast_action_step_migration_item_complete_date_start%5D=&q%5Blast_action_step_migration_item_complete_date_end%5D=&q%5Bstep_migration_item_id%5D=&q%5Bstep_migration_item_complete_date_start%5D=&q%5Bstep_migration_item_complete_date_end%5D=&q%5Bcustomer_contacts_number_min%5D=&q%5Bcustomer_contacts_number_max%5D=&q%5Bcustomer_contact_email%5D=&q%5Bcustomer_contact_mobile_phone_number%5D=&q%5Bcustomer_contact_phone_number%5D=&q%5Bcustomer_contact_employer_name%5D=&q%5Bcustomer_contact_employer_address%5D=&q%5Bcustomer_contact_years_of_service_min%5D=&q%5Bcustomer_contact_years_of_service_max%5D=&q%5Bcustomer_contact_annual_income_min%5D=&q%5Bcustomer_contact_annual_income_max%5D=&q%5Bcustomer_contact_commute%5D=&q%5Bextra_address_info%5D=&q%5Bremarks%5D=&q%5Bcurrent_contract_types%5D=all&q%5Bcurrent_utility_costs_min%5D=&q%5Bcurrent_utility_costs_max%5D=&q%5Bcurrent_rent_min%5D=&q%5Bcurrent_rent_max%5D=&q%5Bbudget_min%5D=&q%5Bbudget_max%5D=&q%5Bland_budget_min%5D=&q%5Bland_budget_max%5D=&q%5Bdesired_purchase_date_start%5D=&q%5Bdesired_purchase_date_end%5D=&q%5Blayout_rooms_number_min%5D=&q%5Blayout_rooms_number_max%5D=&q%5Bdesired_land_area%5D=&q%5Bdesired_occupancy_area%5D=&q%5Brepayment_years_min%5D=&q%5Brepayment_years_max%5D=&q%5Bbonus_repayment_amount_min%5D=&q%5Bbonus_repayment_amount_max%5D=&q%5Bcurrent_loan_status%5D=&q%5Bdesired_elementary_school_id%5D=&q%5Bdesired_junior_high_school_id%5D=&q%5Bcustomer_desired_areas%5D%5Bpostal_code%5D=&q%5Bcustomer_desired_areas%5D%5Bprefecture_id%5D=&q%5Bcustomer_desired_areas%5D%5Bcity_id%5D=&q%5Bcustomer_desired_areas%5D%5Btown_id%5D=&q%5Bcustomer_desired_nearby_station%5D%5Bprefecture_id%5D=&q%5Bcustomer_desired_nearby_station%5D%5Brailway_line_id%5D=&q%5Bcustomer_desired_nearby_station%5D%5Brailway_station_id%5D=&q%5Bcustomer_desired_nearby_station%5D%5Bdistance%5D=&q%5Bcustomer_desired_nearby_station%5D%5Bwalk_minutes%5D=&q%5Bcustomer_customized_input_values_attributes%5D%5B4%5D%5Benterprise_customized_input_value%5D=&q%5Bcustomer_customized_input_values_attributes%5D%5B4%5D%5Benterprise_customized_input_id%5D=01J95TC6KEES87F0YXH29AJP7K&q%5Bcustomer_customized_input_values_attributes%5D%5B5%5D%5Benterprise_customized_input_value%5D=&q%5Bcustomer_customized_input_values_attributes%5D%5B5%5D%5Benterprise_customized_input_id%5D=01JRCT12N9X24PCQ5QZPAYKB93&q%5Bcustomer_customized_input_values_attributes%5D%5B6%5D%5Benterprise_customized_input_value%5D=&q%5Bcustomer_customized_input_values_attributes%5D%5B6%5D%5Benterprise_customized_input_id%5D=01JRF9CZSW65A151WR30NA4PB3&q%5Bintroduction_person_name%5D=&q%5Bintroduction_date_start%5D=&q%5Bintroduction_date_end%5D=&q%5Breaction_date_start%5D=&q%5Breaction_date_end%5D=&q%5Bfirst_interviewed_date_start%5D=&q%5Bfirst_interviewed_date_end%5D=&q%5Bfirst_interviewed_user_id%5D=&q%5Bcompetitor_id%5D=&q%5Bcreated_by_id%5D=&q%5Bcreated_at_start%5D=&q%5Bcreated_at_end%5D=&q%5Bupdated_by_id%5D=&q%5Bupdated_at_start%5D=${formattedDate}&q%5Bupdated_at_end%5D=&sort=&order=&per_page=&page=0&is_table_scroll_required=true&sales_mail_id=&sort=&order=asc&per_page=100&is_table_scroll_required=true&column_settings=customer_contacts_name%2Cin_charge_store%2Cin_charge_user%2Creaction_date%2Cfirst_interviewed_date%2Cfull_address%2Ccustomer_tags%2Csales_promotion_name%2Cdiscovered_reason_name%2Cdesired_elementary_school1&button=`);
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
        await page.goto(`https://pg-cloud.jp/customers?active_tab_key=etc&button=&column_settings=customer_contacts_name%2Cin_charge_store%2Cin_charge_user%2Creaction_date%2Cfirst_interviewed_date%2Cfull_address%2Ccustomer_tags%2Csales_promotion_name%2Cdiscovered_reason_name%2Cdesired_elementary_school1&favorite_conditions_name=&is_table_scroll_required=true&order=asc&page=${ i + 1 }&per_page=100&q%5Bbonus_repayment_amount_max%5D=&q%5Bbonus_repayment_amount_min%5D=&q%5Bbrand_id%5D=&q%5Bbudget_max%5D=&q%5Bbudget_min%5D=&q%5Bcategories%5D=all&q%5Bcity_id%5D=&q%5Bcompetitor_id%5D=&q%5Bcreated_at_end%5D=&q%5Bcreated_at_start%5D=&q%5Bcreated_by_id%5D=&q%5Bcurrent_contract_types%5D=all&q%5Bcurrent_loan_status%5D=&q%5Bcurrent_rent_max%5D=&q%5Bcurrent_rent_min%5D=&q%5Bcurrent_utility_costs_max%5D=&q%5Bcurrent_utility_costs_min%5D=&q%5Bcustomer_contact_annual_income_max%5D=&q%5Bcustomer_contact_annual_income_min%5D=&q%5Bcustomer_contact_birth_date_end%5D=&q%5Bcustomer_contact_birth_date_start%5D=&q%5Bcustomer_contact_commute%5D=&q%5Bcustomer_contact_email%5D=&q%5Bcustomer_contact_employer_address%5D=&q%5Bcustomer_contact_employer_name%5D=&q%5Bcustomer_contact_mobile_phone_number%5D=&q%5Bcustomer_contact_name%5D=&q%5Bcustomer_contact_name_kana%5D=&q%5Bcustomer_contact_phone_number%5D=&q%5Bcustomer_contact_years_of_service_max%5D=&q%5Bcustomer_contact_years_of_service_min%5D=&q%5Bcustomer_contacts_number_max%5D=&q%5Bcustomer_contacts_number_min%5D=&q%5Bcustomer_customized_input_values_attributes%5D%5B0%5D%5Benterprise_customized_input_id%5D=01J82Z5F366ZQ897PXWF6H5ZAM&q%5Bcustomer_customized_input_values_attributes%5D%5B0%5D%5Benterprise_select_option_id%5D=&q%5Bcustomer_customized_input_values_attributes%5D%5B1%5D%5Benterprise_customized_input_id%5D=01JSE7DKY5RYY3T8T8NVR1AJMN&q%5Bcustomer_customized_input_values_attributes%5D%5B1%5D%5Benterprise_select_option_id%5D=&q%5Bcustomer_customized_input_values_attributes%5D%5B2%5D%5Benterprise_customized_input_id%5D=01JSE7H4MQES619NBWX6PQDFRH&q%5Bcustomer_customized_input_values_attributes%5D%5B2%5D%5Benterprise_select_option_id%5D=&q%5Bcustomer_customized_input_values_attributes%5D%5B3%5D%5Benterprise_customized_input_id%5D=01JSE7RNV3VK78YC2GYAG0554D&q%5Bcustomer_customized_input_values_attributes%5D%5B3%5D%5Benterprise_select_option_id%5D=&q%5Bcustomer_customized_input_values_attributes%5D%5B4%5D%5Benterprise_customized_input_id%5D=01J95TC6KEES87F0YXH29AJP7K&q%5Bcustomer_customized_input_values_attributes%5D%5B4%5D%5Benterprise_customized_input_value%5D=&q%5Bcustomer_customized_input_values_attributes%5D%5B5%5D%5Benterprise_customized_input_id%5D=01JRCT12N9X24PCQ5QZPAYKB93&q%5Bcustomer_customized_input_values_attributes%5D%5B5%5D%5Benterprise_customized_input_value%5D=&q%5Bcustomer_customized_input_values_attributes%5D%5B6%5D%5Benterprise_customized_input_id%5D=01JRF9CZSW65A151WR30NA4PB3&q%5Bcustomer_customized_input_values_attributes%5D%5B6%5D%5Benterprise_customized_input_value%5D=&q%5Bcustomer_desired_areas%5D%5Bcity_id%5D=&q%5Bcustomer_desired_areas%5D%5Bpostal_code%5D=&q%5Bcustomer_desired_areas%5D%5Bprefecture_id%5D=&q%5Bcustomer_desired_areas%5D%5Btown_id%5D=&q%5Bcustomer_desired_nearby_station%5D%5Bdistance%5D=&q%5Bcustomer_desired_nearby_station%5D%5Bprefecture_id%5D=&q%5Bcustomer_desired_nearby_station%5D%5Brailway_line_id%5D=&q%5Bcustomer_desired_nearby_station%5D%5Brailway_station_id%5D=&q%5Bcustomer_desired_nearby_station%5D%5Bwalk_minutes%5D=&q%5Bdesired_elementary_school_id%5D=&q%5Bdesired_junior_high_school_id%5D=&q%5Bdesired_land_area%5D=&q%5Bdesired_occupancy_area%5D=&q%5Bdesired_purchase_date_end%5D=&q%5Bdesired_purchase_date_start%5D=&q%5Belementary_school_id%5D=&q%5Bextra_address_info%5D=&q%5Bfirst_interviewed_date_end%5D=&q%5Bfirst_interviewed_date_start%5D=&q%5Bfirst_interviewed_user_id%5D=&q%5Bhas_owned_land%5D=&q%5Bin_charge_store_id%5D=&q%5Bin_charge_user_id%5D=&q%5Bintroduction_date_end%5D=&q%5Bintroduction_date_start%5D=&q%5Bintroduction_person_name%5D=&q%5Bjunior_high_school_id%5D=&q%5Bland_budget_max%5D=&q%5Bland_budget_min%5D=&q%5Blast_action_step_migration_item_complete_date_end%5D=&q%5Blast_action_step_migration_item_complete_date_start%5D=&q%5Blast_action_step_migration_item_id%5D=&q%5Blayout_rooms_number_max%5D=&q%5Blayout_rooms_number_min%5D=&q%5Bpostal_code%5D=&q%5Bprefecture_id%5D=&q%5Breaction_date_end%5D=&q%5Breaction_date_start%5D=&q%5Bremarks%5D=&q%5Brepayment_years_max%5D=&q%5Brepayment_years_min%5D=&q%5Bstatuses%5D=prospective&q%5Bstep_migration_item_complete_date_end%5D=&q%5Bstep_migration_item_complete_date_start%5D=&q%5Bstep_migration_item_id%5D=&q%5Btown_id%5D=&q%5Bupdated_at_end%5D=&q%5Bupdated_at_start%5D=${formattedDate}&q%5Bupdated_by_id%5D=&sales_mail_id=&sort=&to_delete_favorite_conditions_id=&to_save_favorite_conditions=false`);
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

