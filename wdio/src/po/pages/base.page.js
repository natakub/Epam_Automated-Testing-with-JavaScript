const { browser } = require("@wdio/globals");

class BasePage {
  constructor(url) {
    this.url = url;
  }

  async open() {
    await browser.url(this.url);
    await browser.maximizeWindow();
  }
}

module.exports = BasePage;
