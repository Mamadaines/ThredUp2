import {
  Builder,
  By,
  Capabilities,
  until,
  WebDriver,
  WebElement
  
} from "selenium-webdriver"
const chromedriver = require("chromedriver");


/** Optional parameters for the page object */
interface Options {
  /** if no driver is supplied, we make one */
  driver?: WebDriver;
  /** some pages may have a base url */
  url?: string;
}

export class BasePage {
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
   
  driver: WebDriver;
  url: string;
  /**
   *
   * @param {Options} options - optional paramaters for the base page object.
   * @property {WebDriver} options.driver - if no driver is provided, one will be created
   * @property {string} options.url - provide this if the page has a base url
   */
  //constructor(options?: Options) {
    //  if (options && options.driver) this.driver = options.driver;
      //else
        //  this.driver = new Builder()
          //    .withCapabilities(Capabilities.chrome())
            //  .build();
      //if (options && options.url) this.url = options.url;
  //}
  constructor(driver?: WebDriver) {
    if (driver) this.driver = driver;
    else
      this.driver = new Builder().withCapabilities(Capabilities.chrome()).build()

  }
  /**
   * navigates to the url passed in, or to the one stored on the page object
   * @param {string} url - the url to navigate to, unless you wish to use the page's defined base url
   */
  async navigate(url?: string): Promise<void> {
      if (url) return await this.driver.get(url);
      else if (this.url) return await this.driver.get(this.url);
      else
          return Promise.reject(
              "BasePage.navigate() needs a URL defined on the page object, or one passed in. No URL was provided."
          );
  }
  /**
   * waits for the identified element to be located and visible before returning it.
   * @param {By} elementBy - the locator for the element to return.
   */
  async getElement(elementBy: By): Promise<WebElement> {
      await this.driver.wait(until.elementLocated(elementBy));
      let element = await this.driver.findElement(elementBy);
      await this.driver.wait(until.elementIsVisible(element));
      return element;
  }
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
  
  /**
   * clicks the given element after waiting for it
   * @param {By} elementBy - the locator for the element to click
   */
  async click(elementBy: By): Promise<void> {
      return (await this.getElement(elementBy)).click();
  }
  /**
   * clears the given element after waiting for it, and then sends the provided keys
   * @param {By} elementBy - the locator for the element to clear and sendKeys to
   * @param {any} keys - the string or list of keys to send
   */
  async setInput(elementBy: By, keys: any): Promise<void> {
      let input = await this.getElement(elementBy);
      await input.clear();
      return input.sendKeys(keys);
  }
  /**
   * returns an element's text after waiting for it to be visible
   * @param {By} elementBy - the locator of the element to get text from
   */
  async getText(elementBy: By): Promise<string> {
      return (await this.getElement(elementBy)).getText();
  }
  /**
   * returns an element's attribute value after waiting for the element to be visible
   * @param {By} elementBy - the locator of the element to get the value from
   * @param {string} attribute - the attribute to return the value from, such as 'value' or 'href'
   */
  async getAttribute(elementBy: By, attribute: string): Promise<string> {
      return (await this.getElement(elementBy)).getAttribute(attribute);
  }
  
  async anotherClick(elementBy: By) {
      let myElement = await this.driver.wait(until.elementLocated(elementBy))
      await myElement.click()
  }
}