const { expect, browser, $ } = require("@wdio/globals");
const { waitAndClick } = require("../commands");
const { Key } = require("webdriverio");

describe("Dynamic Controls - waitUntil()", () => {
  beforeEach(async () => {
    await browser.url("https://the-internet.herokuapp.com/dynamic_controls");
  });

  describe("Add/Remove checkbox", () => {
    it("'Add' button should appear and checkbox should be removed after some time when click on 'Remove'", async () => {
      const checkboxButton = await $("#checkbox-example button");
      const message = await $("#checkbox-example p#message");
      const checkbox = await $("#checkbox-example #checkbox");

      await waitAndClick(checkboxButton);

      //will wait until button change its text
      await checkboxButton.waitUntil(
        async () => {
          return (await checkboxButton.getText()) === "Add";
        },
        {
          timeout: 5000,
          timeoutMsg: "expected text of the button to be different after 5 sec",
        }
      );

      expect(await checkbox.isExisting()).toBe(false);
      expect(await message.isDisplayed()).toBe(true);
      await expect(checkboxButton).toHaveText("Add");
      await expect(message).toHaveText("It's gone!");
    });

    it("Loading message should be displayed after 'Remove' button click and disappear after checkbox removal", async () => {
      const checkboxButton = await $("#checkbox-example button");
      const message = await $("#checkbox-example p#message");
      const checkbox = await $("#checkbox-example #checkbox");
      const loading = await $("#checkbox-example #loading");

      await waitAndClick(checkboxButton);

      expect(await loading.isDisplayed()).toBe(true);
      //wait till disappear
      await loading.waitForDisplayed({ timeout: 5000, reverse: true });

      //check that load disappeared
      expect(await loading.isDisplayed()).toBe(false);
      expect(await checkbox.isExisting()).toBe(false);
      expect(await message.isDisplayed()).toBe(true);
    });
  });

  describe("Enable/Disable input", () => {
    it("'Disable' button should appear and input should became enabled for interaction after some time when click on 'Enable'", async () => {
      const inputButton = await $("#input-example button");
      const message = await $("#input-example p#message");
      const input = await $("#input-example input");

      await waitAndClick(inputButton);

      // will wait until input is clicable
      await input.waitUntil(
        async () => {
          return (await input.isClickable()) === true;
        },
        {
          timeout: 5000,
          timeoutMsg: "expected input became clickable after 5 sec",
        }
      );

      // add some value and interact with it
      await waitAndClick(input);
      await input.setValue("test");

      await expect(input).toHaveValue("test");
      expect(await input.isClickable()).toBe(true);
      expect(await inputButton.getText()).toHaveText("Disable");
      expect(await message.isDisplayed()).toBe(true);
      await expect(message).toHaveText("It's enabled!");
    });
  });
});

describe("Dynamically Loaded Page Elements - execute()", () => {
  before(async () => {
    await browser.url("https://the-internet.herokuapp.com/dynamic_loading/1");
    await browser.maximizeWindow();
  });

  it("The loading time of the text after clicking the button on the page should not exceed 6 seconds, or error will be thrown", async () => {
    const startButton = await $("#start button:first-child");
    const loadedText = await $("#finish h4");

    //record the current time stamp before clicking the button
    const startTime = await browser.execute(() => performance.now());

    //click
    await startButton.click();

    //wait until text is loaded, if still not loaded - throw an error
    await browser.waitUntil(
      async () => {
        return (await loadedText.getText()) === "Hello World!";
      },
      {
        timeout: 6000,
        timeoutMsg: "Text did not load within 6 seconds",
      }
    );

    //record the timestamp after the text is loaded
    const endTime = await browser.execute(() => performance.now());

    //calculate
    const loadTime = endTime - startTime;
    //Check the exact loading time
    console.log(`Text load time: ${loadTime} milliseconds`);
  });
});

describe("Iframe - doubleclick()", () => {
  before(async () => {
    await browser.url("https://the-internet.herokuapp.com/iframe");
    await browser.maximizeWindow();
  });

  it("Should switch to iframe on the page and interact with it by writing text and underlining it", async () => {
    const iframeTextArea = await $("//*[@id='tinymce']");
    const iframeTextElement = await $("//*[@id='tinymce']/p");
    const iframeUnderlinedTextElement = await $("//*[@id='tinymce']/p/span");

    await browser.switchToFrame(0);
    expect(await iframeTextArea.getText()).toHaveTextContaining(
      "Your content goes here."
    );

    await iframeTextArea.clearValue();
    await iframeTextArea.click();
    await iframeTextArea.setValue("Testing");
    expect(await iframeTextArea.getValue()).toHaveTextContaining("Testing");

    //double click and perform keys action
    await iframeTextElement.doubleClick();
    await browser.keys([Key.Ctrl, "u"]);

    //get CSS property of text
    const textDecoration = await iframeUnderlinedTextElement.getCSSProperty(
      "text-decoration"
    );
    const textDecorationValue = textDecoration.value;

    expect(textDecorationValue).toHaveTextContaining("underline");
  });
});

describe("Login Page - local storage", () => {
  before(async () => {
    await browser.url("https://the-internet.herokuapp.com/login");
    await browser.maximizeWindow();
  });

  it("Should login with valid credentials and set value to the local storage", async () => {
    const usernameInput = await $("//input[@name='username']");
    const passwordInput = await $("//input[@name='password']");
    const submitButton = await $("button[type='submit']");
    const logMessage = await $("#flash");

    //set value in local storage
    const key = "userName";
    const value = "tomsmith";

    await browser.execute(
      function (key, value) {
        window.localStorage.setItem(key, value);
      },
      key,
      value
    );

    //enter valid credentiials
    await usernameInput.setValue("tomsmith");
    await passwordInput.setValue("SuperSecretPassword!");
    await waitAndClick(submitButton);

    //check succesfull login
    await expect(browser).toHaveUrlContaining("secure");
    expect(await logMessage.isExisting()).toBe(true);
    await expect(logMessage).toHaveTextContaining(
      "You logged into a secure area!"
    );

    // ensure that the local storage value is set before reading it
    await browser.waitUntil(
      async () => {
        const readValue = await browser.execute(function (key) {
          return window.localStorage.getItem(key);
        }, key);
        return readValue === value;
      },
      {
        timeout: 5000,
        timeoutMsg:
          "Local storage value did not match the expected value within 5 seconds",
      }
    );

    //Now safely retrive local storage value for our assertion
    const readValue = await browser.execute(function (key) {
      return window.localStorage.getItem(key);
    }, key);

    await expect(readValue).toBe(value);
  });
});
