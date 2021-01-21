import {BasePage} from "./PageObjects/BasePage"
import { Builder, By, Capabilities, until } from "selenium-webdriver"
const page = new BasePage();
//const driver = WebDriver = new Builder().withCapabilities(Capabilities.chrome()).build()
  describe("Login functionality", () => {
    //const page = new BasePage(driver)
    beforeEach(async () => {
      await page.navigate();
    });
    afterAll(async () => {
     page.driver.quit();
    });

 

  test('ThredUP login', async () => {
    await page.driver.get(page.url)
    await page.clickAndEnter(page.email, "george@gmail.com");
    // clicks start shopping button
    await page.click(page.startShopping);
    //await page.click(page.addPassword);
    await page.clickAndEnter(page.setPassword, "456789")
    await page.click(page.submit)
    await page.driver.sleep(5000)
  
    
  });

});