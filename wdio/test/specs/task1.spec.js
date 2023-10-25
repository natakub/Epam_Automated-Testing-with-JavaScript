// const { expect, browser, $ } = require("@wdio/globals");
// const { waitAndClick } = require("../commands");

// describe("Add/Remove Elements App", () => {
//   beforeEach(async () => {
//     await browser.url(
//       "https://the-internet.herokuapp.com/add_remove_elements/"
//     );
//   });

//   it("Should satisfy basic appearance criteria", async () => {
//     const title = await $("//body//h3");
//     const addButton = await $("button[onclick='addElement()']");
//     const buttons = await $$("button[onclick]");

//     await expect(title).toHaveText("Add/Remove Elements");
//     await expect(addButton).toHaveTextContaining("Add Element");

//     await addButton.click();

//     for (const button of buttons) {
//       await button.waitForDisplayed();

//       const backgroundColor = await button.getCSSProperty("background-color");
//       const margin = await button.getCSSProperty("margin");

//       expect(backgroundColor.parsed.hex).toEqual("#29a0c4");
//       expect(margin.value).toEqual("0px 0px 10px 0px");
//     }
//   });

//   it("Button should change the background color when hovered", async () => {
//     const button = await $("button[onclick='addElement()']");
//     const defaultColor = await button.getCSSProperty("background-color");

//     await button.moveTo();

//     const isColorChanged = await browser.waitUntil(
//       async () => {
//         const hoveredColor = await button.getCSSProperty("background-color");

//         return defaultColor.value !== hoveredColor.value;
//       },
//       {
//         timeout: 300,
//         timeoutMsg: "expected color to be different after 300ms",
//       }
//     );

//     await expect(isColorChanged).toBe(true);
//   });

//   it("'Delete' button should be added to the page after every click on the 'Add element' button", async () => {
//     const addButton = await $("button[onclick='addElement()']");
//     const deleteButton = await $$("button.added-manually");
//     const elementsBlock = await $("div#elements");

//     for (let i = 0; i < 4; i++) {
//       await waitAndClick(addButton);
//     }

//     await expect(elementsBlock).toHaveChildren(4);
//     await expect(deleteButton).toBePresent();
//   });

//   it("'Delete' button should disappear after being clicked", async () => {
//     const addButton = await $("button[onclick='addElement()']");
//     const deleteButtons = await $("#elements").$$("button.added-manually");
//     const elementsBlock = await $("div#elements");

//     for (let i = 0; i < 4; i++) {
//       await waitAndClick(addButton);
//     }

//     await $(".added-manually").click();
//     await expect(deleteButtons).toBeElementsArrayOfSize(3);

//     await Promise.all(
//       deleteButtons.map(async (deleteButton) => {
//         await waitAndClick(deleteButton);
//       })
//     );

//     await expect(elementsBlock).not.toHaveChildren();
//     await expect(deleteButtons).not.toBeExisting();
//   });
// });

// describe("Java Script Alerts application", () => {
//   beforeEach("Open", async () => {
//     await browser.url("https://the-internet.herokuapp.com/javascript_alerts");
//     await browser.maximizeWindow();
//   });

//   describe("Alert App", () => {
//     it("Alert button should throw an allert pop-up when click on it, and text confirmation should be displayed on the page after accepting an alert", async () => {
//       const alertButton = await $("button[onClick='jsAlert()']");
//       const resultBox = await $("//p[@id='result']");

//       await expect(alertButton).toBeClickable();

//       await alertButton.click();
//       expect(await browser.getAlertText()).toEqual("I am a JS Alert");

//       await browser.acceptAlert();
//       await expect(resultBox).toHaveText("You successfully clicked an alert");
//     });
//   });

//   describe("Confirm App", () => {
//     it("Confirm button should throw a confirm pop-up when click on it, and corresponding text should be displayed on the page after alert confirmation", async () => {
//       const confirmButton = await $("//button[text()='Click for JS Confirm']");
//       const resultBox = await $("#result");

//       await expect(confirmButton).toBeClickable();

//       await confirmButton.click();
//       expect(await browser.getAlertText()).toEqual("I am a JS Confirm");

//       await browser.acceptAlert();
//       await expect(resultBox).toHaveTextContaining("Ok");
//     });

//     it("Corresponding text should be displayed on the page after alert dismissal", async () => {
//       const confirmButton = await $("//button[text()='Click for JS Confirm']");
//       const resultBox = await $("#result");

//       await confirmButton.click();
//       await browser.dismissAlert();

//       await expect(resultBox).toHaveTextContaining("Cancel");
//     });
//   });

//   describe("Prompt App, positive tests", () => {
//     it("Prompt button should throw a prompt pop-up when click on it, and exact same text as what was entered during the prompt should be displayed on the page after confirming the prompt", async () => {
//       const promptButton = await $("//button[@oncLick='jsPrompt()']");
//       const resultBox = await $("#result");

//       await promptButton.click();

//       expect(await browser.getAlertText()).toEqual("I am a JS prompt");

//       await browser.sendAlertText("some text");
//       await browser.acceptAlert();

//       await expect(resultBox).toHaveText("You entered: some text");
//     });

//     it("'null' should be displayed when dismissing the prompt alert", async () => {
//       const promptButton = await $("//button[@oncLick='jsPrompt()']");
//       const resultBox = await $("#result");

//       await promptButton.click();
//       await browser.dismissAlert();

//       await expect(resultBox).toHaveText("You entered: null");
//     });
//   });

//   describe("Prompt App, negative test", () => {
//     it("Should trim white spaces before and after the text entered in prompt input when displaying it on the page", async () => {
//       const promptButton = await $("//button[@oncLick='jsPrompt()']");
//       const resultBox = await $("#result");
//       const inputString = "\u0020".repeat(3) + "some text" + "\u0020".repeat(5);

//       await promptButton.click();
//       await browser.sendAlertText(inputString);
//       await browser.acceptAlert();

//       await expect(resultBox).toHaveText("You entered: some text");
//     });

//     it("No horizontal scroll should appear when entering a string with a lot of characters", async () => {
//       const promptButton = await $("//button[@oncLick='jsPrompt()']");
//       const resultBox = await $("#result");
//       const inputString = "This is a very long string." + "m".repeat(200);

//       await promptButton.click();
//       await browser.sendAlertText(inputString);
//       await browser.acceptAlert();

//       await expect(resultBox).toHaveText(`You entered: ${inputString}`);

//       const hasHorizontalScroll = await browser.execute(() => {
//         const element = document.querySelector("#result");
//         return element.scrollWidth > element.clientWidth;
//       });

//       await expect(hasHorizontalScroll).toBe(
//         false,
//         "Horizontal scroll is present."
//       );
//     });
//   });
// });
