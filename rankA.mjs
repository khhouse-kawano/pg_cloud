import { chromium } from 'playwright';
import fs from 'fs';
import { rankScraping } from './budgetRankA.mjs';
import { postRank } from './postRankA.js';

const rankArray = [{ rank: "A", value: "01J82Z5F3D6A4K5PWB0ZMZN46V" }, { rank: "B", value : "01J82Z5F3JX62Z7VCVRYSW8W8Z" }];

(async () => {
  for (const element of rankArray) {
    const allElements = [];
  // ブラウザをヘッドレスモードを無効にして起動
    const browser = await chromium.launch({ headless: false });
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

    const page = await context.newPage();
    
    await page.goto(`https://pg-cloud.jp/customers?active_tab_key=default&to_save_favorite_conditions=false&favorite_conditions_name=&to_delete_favorite_conditions_id=&q%5Bcategories%5D=all&q%5Bhas_owned_land%5D=&q%5Bstatuses%5D=all&q%5Bbrand_id%5D=&q%5Bin_charge_store_id%5D=&q%5Bin_charge_user_id%5D=&q%5Bcustomer_customized_input_values_attributes%5D%5B0%5D%5Benterprise_select_option_id%5D=${ element.value }&q%5Bcustomer_customized_input_values_attributes%5D%5B0%5D%5Benterprise_customized_input_id%5D=01J82Z5F366ZQ897PXWF6H5ZAM&q%5Bcustomer_contact_name%5D=&q%5Bcustomer_contact_name_kana%5D=&q%5Bcustomer_contact_birth_date_start%5D=&q%5Bcustomer_contact_birth_date_end%5D=&q%5Bpostal_code%5D=&q%5Bprefecture_id%5D=&q%5Bcity_id%5D=&q%5Btown_id%5D=&q%5Belementary_school_id%5D=&q%5Bjunior_high_school_id%5D=&q%5Blast_action_step_migration_item_id%5D=&q%5Blast_action_step_migration_item_complete_date_start%5D=&q%5Blast_action_step_migration_item_complete_date_end%5D=&q%5Bstep_migration_item_id%5D=&q%5Bstep_migration_item_complete_date_start%5D=&q%5Bstep_migration_item_complete_date_end%5D=&q%5Bcustomer_contacts_number_min%5D=&q%5Bcustomer_contacts_number_max%5D=&q%5Bcustomer_contact_email%5D=&q%5Bcustomer_contact_mobile_phone_number%5D=&q%5Bcustomer_contact_phone_number%5D=&q%5Bcustomer_contact_employer_name%5D=&q%5Bcustomer_contact_employer_address%5D=&q%5Bcustomer_contact_years_of_service_min%5D=&q%5Bcustomer_contact_years_of_service_max%5D=&q%5Bcustomer_contact_annual_income_min%5D=&q%5Bcustomer_contact_annual_income_max%5D=&q%5Bcustomer_contact_commute%5D=&q%5Bextra_address_info%5D=&q%5Bremarks%5D=&q%5Bcurrent_contract_types%5D=all&q%5Bcurrent_utility_costs_min%5D=&q%5Bcurrent_utility_costs_max%5D=&q%5Bcurrent_rent_min%5D=&q%5Bcurrent_rent_max%5D=&q%5Bbudget_min%5D=&q%5Bbudget_max%5D=&q%5Bland_budget_min%5D=&q%5Bland_budget_max%5D=&q%5Bdesired_purchase_date_start%5D=&q%5Bdesired_purchase_date_end%5D=&q%5Blayout_rooms_number_min%5D=&q%5Blayout_rooms_number_max%5D=&q%5Bdesired_land_area%5D=&q%5Bdesired_occupancy_area%5D=&q%5Brepayment_years_min%5D=&q%5Brepayment_years_max%5D=&q%5Bbonus_repayment_amount_min%5D=&q%5Bbonus_repayment_amount_max%5D=&q%5Bcurrent_loan_status%5D=&q%5Bdesired_elementary_school_id%5D=&q%5Bdesired_junior_high_school_id%5D=&q%5Bcustomer_desired_areas%5D%5Bpostal_code%5D=&q%5Bcustomer_desired_areas%5D%5Bprefecture_id%5D=&q%5Bcustomer_desired_areas%5D%5Bcity_id%5D=&q%5Bcustomer_desired_areas%5D%5Btown_id%5D=&q%5Bcustomer_desired_nearby_station%5D%5Bprefecture_id%5D=&q%5Bcustomer_desired_nearby_station%5D%5Brailway_line_id%5D=&q%5Bcustomer_desired_nearby_station%5D%5Brailway_station_id%5D=&q%5Bcustomer_desired_nearby_station%5D%5Bdistance%5D=&q%5Bcustomer_desired_nearby_station%5D%5Bwalk_minutes%5D=&q%5Bcustomer_customized_input_values_attributes%5D%5B1%5D%5Benterprise_customized_input_value%5D=&q%5Bcustomer_customized_input_values_attributes%5D%5B1%5D%5Benterprise_customized_input_id%5D=01J95TBZQ2PE36R27E515XMG5D&q%5Bcustomer_customized_input_values_attributes%5D%5B2%5D%5Benterprise_customized_input_value%5D=&q%5Bcustomer_customized_input_values_attributes%5D%5B2%5D%5Benterprise_customized_input_id%5D=01J95TC6KEES87F0YXH29AJP7K&q%5Bintroduction_person_name%5D=&q%5Bintroduction_date_start%5D=&q%5Bintroduction_date_end%5D=&q%5Breaction_date_start%5D=&q%5Breaction_date_end%5D=&q%5Bfirst_interviewed_date_start%5D=&q%5Bfirst_interviewed_date_end%5D=&q%5Bfirst_interviewed_user_id%5D=&q%5Bcompetitor_id%5D=&q%5Bcreated_by_id%5D=&q%5Bcreated_at_start%5D=&q%5Bcreated_at_end%5D=&q%5Bupdated_by_id%5D=&q%5Bupdated_at_start%5D=&q%5Bupdated_at_end%5D=&sort=&order=&per_page=&page=0&is_table_scroll_required=true&sales_mail_id=&sort=&order=asc&per_page=50&is_table_scroll_required=true&column_settings=customer_contacts_name%2Cin_charge_store%2Cin_charge_user%2Creaction_date%2Cfirst_interviewed_date%2Cfull_address%2Ccustomer_tags&button=`);
    const count = await page.$eval('//html/body/main/div/div[4]/div[2]/div[1]/div[1]/div/span', el => el.innerText.trim());
    const pageCount = count / 50 <= 1 ? 1 : Math.ceil(count / 50);
    for (let e = 0; e < pageCount; e++) {
      await page.goto(`https://pg-cloud.jp/customers?active_tab_key=default&to_save_favorite_conditions=false&favorite_conditions_name=&to_delete_favorite_conditions_id=&q%5Bcategories%5D=all&q%5Bhas_owned_land%5D=&q%5Bstatuses%5D=all&q%5Bbrand_id%5D=&q%5Bin_charge_store_id%5D=&q%5Bin_charge_user_id%5D=&q%5Bcustomer_customized_input_values_attributes%5D%5B0%5D%5Benterprise_select_option_id%5D=${ element.value }&q%5Bcustomer_customized_input_values_attributes%5D%5B0%5D%5Benterprise_customized_input_id%5D=01J82Z5F366ZQ897PXWF6H5ZAM&q%5Bcustomer_contact_name%5D=&q%5Bcustomer_contact_name_kana%5D=&q%5Bcustomer_contact_birth_date_start%5D=&q%5Bcustomer_contact_birth_date_end%5D=&q%5Bpostal_code%5D=&q%5Bprefecture_id%5D=&q%5Bcity_id%5D=&q%5Btown_id%5D=&q%5Belementary_school_id%5D=&q%5Bjunior_high_school_id%5D=&q%5Blast_action_step_migration_item_id%5D=&q%5Blast_action_step_migration_item_complete_date_start%5D=&q%5Blast_action_step_migration_item_complete_date_end%5D=&q%5Bstep_migration_item_id%5D=&q%5Bstep_migration_item_complete_date_start%5D=&q%5Bstep_migration_item_complete_date_end%5D=&q%5Bcustomer_contacts_number_min%5D=&q%5Bcustomer_contacts_number_max%5D=&q%5Bcustomer_contact_email%5D=&q%5Bcustomer_contact_mobile_phone_number%5D=&q%5Bcustomer_contact_phone_number%5D=&q%5Bcustomer_contact_employer_name%5D=&q%5Bcustomer_contact_employer_address%5D=&q%5Bcustomer_contact_years_of_service_min%5D=&q%5Bcustomer_contact_years_of_service_max%5D=&q%5Bcustomer_contact_annual_income_min%5D=&q%5Bcustomer_contact_annual_income_max%5D=&q%5Bcustomer_contact_commute%5D=&q%5Bextra_address_info%5D=&q%5Bremarks%5D=&q%5Bcurrent_contract_types%5D=all&q%5Bcurrent_utility_costs_min%5D=&q%5Bcurrent_utility_costs_max%5D=&q%5Bcurrent_rent_min%5D=&q%5Bcurrent_rent_max%5D=&q%5Bbudget_min%5D=&q%5Bbudget_max%5D=&q%5Bland_budget_min%5D=&q%5Bland_budget_max%5D=&q%5Bdesired_purchase_date_start%5D=&q%5Bdesired_purchase_date_end%5D=&q%5Blayout_rooms_number_min%5D=&q%5Blayout_rooms_number_max%5D=&q%5Bdesired_land_area%5D=&q%5Bdesired_occupancy_area%5D=&q%5Brepayment_years_min%5D=&q%5Brepayment_years_max%5D=&q%5Bbonus_repayment_amount_min%5D=&q%5Bbonus_repayment_amount_max%5D=&q%5Bcurrent_loan_status%5D=&q%5Bdesired_elementary_school_id%5D=&q%5Bdesired_junior_high_school_id%5D=&q%5Bcustomer_desired_areas%5D%5Bpostal_code%5D=&q%5Bcustomer_desired_areas%5D%5Bprefecture_id%5D=&q%5Bcustomer_desired_areas%5D%5Bcity_id%5D=&q%5Bcustomer_desired_areas%5D%5Btown_id%5D=&q%5Bcustomer_desired_nearby_station%5D%5Bprefecture_id%5D=&q%5Bcustomer_desired_nearby_station%5D%5Brailway_line_id%5D=&q%5Bcustomer_desired_nearby_station%5D%5Brailway_station_id%5D=&q%5Bcustomer_desired_nearby_station%5D%5Bdistance%5D=&q%5Bcustomer_desired_nearby_station%5D%5Bwalk_minutes%5D=&q%5Bcustomer_customized_input_values_attributes%5D%5B1%5D%5Benterprise_customized_input_value%5D=&q%5Bcustomer_customized_input_values_attributes%5D%5B1%5D%5Benterprise_customized_input_id%5D=01J95TBZQ2PE36R27E515XMG5D&q%5Bcustomer_customized_input_values_attributes%5D%5B2%5D%5Benterprise_customized_input_value%5D=&q%5Bcustomer_customized_input_values_attributes%5D%5B2%5D%5Benterprise_customized_input_id%5D=01J95TC6KEES87F0YXH29AJP7K&q%5Bintroduction_person_name%5D=&q%5Bintroduction_date_start%5D=&q%5Bintroduction_date_end%5D=&q%5Breaction_date_start%5D=&q%5Breaction_date_end%5D=&q%5Bfirst_interviewed_date_start%5D=&q%5Bfirst_interviewed_date_end%5D=&q%5Bfirst_interviewed_user_id%5D=&q%5Bcompetitor_id%5D=&q%5Bcreated_by_id%5D=&q%5Bcreated_at_start%5D=&q%5Bcreated_at_end%5D=&q%5Bupdated_by_id%5D=&q%5Bupdated_at_start%5D=&q%5Bupdated_at_end%5D=&sort=&order=&per_page=&page=${e+1}&is_table_scroll_required=true&sales_mail_id=&sort=&order=asc&per_page=50&is_table_scroll_required=true&column_settings=customer_contacts_name%2Cin_charge_store%2Cin_charge_user%2Creaction_date%2Cfirst_interviewed_date%2Cfull_address&button=`);
      await page.waitForLoadState('networkidle');
      const pageElements = await Promise.all([...Array(50).keys()].map(async (i) => {

        // 行数を取得
        const rowCount = await page.$$eval('body > main > div > div.table > div.table-wrapper > table > tbody > tr', rows => rows.length);

        // 行が存在しなければスキップ
        if (i >= rowCount) return null;
        
        const selector = `//html/body/main/div/div[4]/div[3]/table/tbody/tr[${i + 1}]/td[2]/a`;
        const href = await page.getAttribute(selector, 'href');
        const name = await page.innerText(selector);
        const shopSelector = `//html/body/main/div/div[4]/div[3]/table/tbody/tr[${i + 1}]/td[3]`;
        const shop = await page.innerText(shopSelector);
        const today = new Date();
        const year = today.getUTCFullYear();
        const month = String(today.getMonth() +1).padStart(2,'0');
        const day = String(today.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;
        if (href && name) {
            const match = href.match(/\/customers\/(.*?)\/summary/);
        if (match) {
          return { name: name.trim(), id: match[1], date: formattedDate, rank: element.rank, shop: shop.trim() };
        }
        }
    return null;
    }));

        // nullを除外してallElementsに追加
        allElements.push(...pageElements.filter(e => e !== null));
        // CSVファイルにデータを書き込む
        const csvContent = 'name,id,date,rank,shop\n' + allElements.map(e => `${e.name},${e.id},${e.date},${e.rank}ランク,${e.shop}`).join('\n');
        fs.writeFileSync(`outputRank${ element.rank }.csv`, csvContent);
    }
  console.log(allElements);
  console.log(`outputRank${ element.rank }.csvの生成完了`);


  // ブラウザを閉じる
  await browser.close();
  };
  for (const value of rankArray){
    await rankScraping(value.rank);
    await postRank(value.rank);
  }

})();
