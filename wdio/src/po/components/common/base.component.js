class BaseComponent {
  constructor(rootSelector) {
    this.rootSelector = rootSelector;
  }

  get rootEl() {
    return $(this.rootSelector);
  }

  //get all needed  CSS properties from an element and put them into an array
  async getCSSfromElement(element, ...properties) {
    const arr = [];

    for (const property of properties) {
      const elementProperty = await element.getCSSProperty(property);

      arr.push(elementProperty);
    }

    return arr;
  }

  //check if elemnt change color when hovered. If not - returns error message
  async isChangeColorWhenHovered(element) {
    const defaultColor = await element.getCSSProperty("background-color");

    await element.moveTo();

    const isColorChanged = await browser.waitUntil(
      async () => {
        const hoveredColor = await element.getCSSProperty("background-color");

        return defaultColor.value !== hoveredColor.value;
      },
      {
        timeout: 1000,
        timeoutMsg:
          "When hovered, color of an element haven't changed after 1000ms",
      }
    );

    return isColorChanged;
  }
}

module.exports = BaseComponent;
