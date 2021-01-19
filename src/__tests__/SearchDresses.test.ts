import {ThredUpPage} from "./PageObjects/ThredUpPage";

const fs = require("fs");


  describe("Login and Logout funtionality works", () => {
    const page = new ThredUpPage({ browser: "chrome" });
    afterAll(async () => {
     page.driver.quit();
    });

    test('ThredUP login', async () => {
    await page.driver.get(page.url)
    //await page.driver.wait(until.elementLocated(By.xpath('//div[@class="u-flex u-flex-col u-bg-white u-rounded-4 u-m-auto u-relative _1ivBsHCOh3N7wt6s01Kjqj _1o5gMN69zQnHFzMZNJfAGX"]')))
    await page.clickAndEnter(page.email, "george@gmail.com");
    // clicks start shopping button
    await page.click(page.startShopping);
    await page.click(page.addPassword);
    await page.clickAndEnter(page.setPassword, "456789")
    await page.driver.sleep(5000)
    });

    test('Search for Dresses', async () => {
      await page.clickAndEnter(page.searchBar, "dresses")
      await page.driver.sleep(5000)
      await fs.writeFile(
        //filepath
        `${__dirname}/dresses.png`,
        //get the data to save (our screenshot)
        await page.driver.takeScreenshot(),
        //add an encoding argument
        "base64",
        //then the callback
        (e) => {
          if (e) console.error(e);
          else console.log("Image saved successfully");
        }
      );
    });
    });