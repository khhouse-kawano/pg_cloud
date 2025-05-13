// @ts-check
import { chromium } from 'playwright';

async function PG_CLOUD(mail,password) {
  const browser = await chromium.launch({headless:false});
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

  await browser.close;
}

const pg_mail = "mkt@kh-house.jp";

const pg_pass = "password";

PG_CLOUD(pg_mail,pg_pass);

