import {
  Builder,
  By,
  Capabilities,
  until,
  WebDriver,
  WebElement
  
} from "selenium-webdriver"
  

  import {BasePage} from "./BasePage";
  
  export class ThredUpPage extends BasePage {
      // Search bar
      searchBar: By = By.id('#search-input')
      //email input
      email: By = By.className('.ui-input')
      //clicks the start shopping button
      startShopping: By = By.css('button[type="submit"]')
      //clicks the add password button
      addPassword: By = By.css('input[autocomplete="new-password"]')
      //clicks the set Password button
      setPassword: By = By.id('#password')
      //shows the 50% off popUP
      popUp: By = By.xpath('//div[@class="u-flex u-flex-col u-bg-white u-rounded-4 u-m-auto u-relative _1ivBsHCOh3N7wt6s01Kjqj _1o5gMN69zQnHFzMZNJfAGX"]')
      //Seaches for a particular dress
      Results: By = By.xpath('(//a[@class="WCdF1-WeVI0oEKb0AIa4c"])[1]')
      // shows add to cart
      addtoCart: By = By.xpath('(//button[text()="Add to Cart"])[1]')
      //views what is in the cart
      viewCart: By = By.xpath('//a[@class="ui-button ui-primary u-flex-1"]')
      
      sleep(ms: number) {
        return new Promise( resolve => setTimeout(resolve, ms));
      }
      // Account page URL
      accountURL: string = "https://www.thredup.com/";
    
       // constructor
      constructor(options) {
        super(options);
        this.url =
        "https://www.thredup.com/";
      }
      async navigate() {
        await this.driver.get(this.url);
        await this.driver.wait(until.elementLocated(this.popUp));
        await this.driver.wait(
          until.elementIsVisible(await this.getElement(this.popUp))
        );
      }
      /**
       * This function gets a web page element, clicks it, and enters
       * user-designated text.
       * 
       * @param element - Element that will receive text
       * @param input - text to be entered into the element
       */
      async clickAndEnter(element:By, input:string) {
        await this.getElement(element);
        await this.click(element);
        await this.setInput(element, input);
      }
      
      async login() {
          // Navigate to login page
        await this.navigate();
         // clicks and enters email
        await this.clickAndEnter(this.email, "george@gmail.com");
        //finds start shopping button
        await this.getElement(this.startShopping);
        //clicks start shopping button
        await this.click(this.startShopping);
        // //Clicks and enters password
        await this.clickAndEnter(this.addPassword, "456789");
        // Finds set password button
        await this.getElement(this.setPassword);
        // Clicks set password button
        await this.click(this.setPassword);
      }
     /**
     * Tests whether the popup is displayed 
     */
      async PopupDisplayed() {
        await this.driver.wait(until.elementLocated(this.popUp))
        let PopupDisplayed: boolean = await this.driver.findElement(By.className("popUp")).isDisplayed();
        return PopupDisplayed;
    }
      async searchDress(searchTerm: string) {
        await this.click(this.searchBar);
        await this.driver.switchTo().activeElement().sendKeys(`${searchTerm}\n`);
        await this.driver.wait(until.elementLocated(this.Results));
    }
     /**
     * Logs in and navigates to the user's page.
     * Uses the URL for the account page rather than the UI.
     */
      async NavPage() {
       await this.navigate();
        await this.login();
        // wait for popUP to be located and visible.
        await this.driver.wait(until.elementLocated(this.popUp));
        let element = await this.driver.findElement(this.popUp);
        await this.driver.wait(until.elementIsVisible(element));
       // Go to account page
       await this.driver.get(this.accountURL);
        // Wait until header logo on User's page is enabled.
        await this.driver.wait(
        until.elementIsEnabled(await this.getElement(this.popUp))
      );
    }
      async dressesResults() {
        let dressesResults = [];
        await this.driver.wait(until.elementsLocated(this.Results));
        let elements = await this.driver.findElements(this.Results);
        for (let i = 0; i < elements.length; i++) {
        dressesResults.push(await (await elements[i].getText()).toLowerCase());
      }
      return dressesResults;
    }

      async addingitemtoCart() {
        await this.driver.wait(until.elementLocated(this.addingitemtoCart))
        await this.click(this.addtoCart)
        await this.driver.wait(until.elementLocated(this.viewCart))
       }
  }
  
      
  
  
 