class Button {
  constructor(selector) {
    this.selector = selector;
  }

  get element() {
    return $(this.selector);
  }

  get elements() {
    return $$(this.selector);
  }

  async waitAndClick() {
    await this.element.waitForExist({
      timeout: 5000,
      timeoutMsg: "Button did not exist",
    });
    await this.element.waitForDisplayed({
      timeout: 5000,
      timeoutMsg: "Button did not display",
    });
    await this.element.click();
  }

  async clickMultipleTimes(num) {
    for (let i = 0; i < num; i++) {
      await this.waitAndClick();
    }
  }
}

module.exports = Button;
