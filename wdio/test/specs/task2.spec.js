// const { expect, browser, $ } = require("@wdio/globals");
// const { waitAndClick } = require("../commands");

// describe("Floating Menu", () => {
//   before(async () => {
//     await browser.url("https://the-internet.herokuapp.com/floating_menu");
//   });

//   it("Header menu should be seen in a viewport after the page is scrolled", async () => {
//     const pageTitle = await $("div[class='example'] h3");
//     const floatingMenu = await $("#menu");

//     const titleDisplayedinViewport = await pageTitle.isDisplayedInViewport();
//     const primaryPosition = await floatingMenu.getCSSProperty("top");

//     if (titleDisplayedinViewport) {
//       await browser.scroll(0, 1000);
//     }

//     const isPositionChanged = await browser.waitUntil(
//       async () => {
//         const currentPosition = await floatingMenu.getCSSProperty("top");

//         return primaryPosition.value !== currentPosition.value;
//       },
//       {
//         timeout: 1000,
//         timeoutMsg:
//           "expected top position of the menu to have different value after 1s",
//       }
//     );

//     await expect(isPositionChanged).toBe(true);
//     expect(await pageTitle.isDisplayed()).toBe(true);
//     expect(await pageTitle.isDisplayedInViewport()).toBe(false);
//     expect(await floatingMenu.isDisplayed()).toBe(true);
//     expect(await floatingMenu.isDisplayedInViewport()).toBe(true);
//   });
// });

// describe("Drag and Drop", () => {
//   beforeEach(async () => {
//     await browser.url("https://the-internet.herokuapp.com/drag_and_drop");
//     await browser.maximizeWindow();
//   });

//   describe("Drag and Drop, positive test", () => {
//     it("Columns should switch places when dragged and dropped on each other", async () => {
//       const columnA = await $("#columns div:first-child");
//       const columnB = await $("#columns div:nth-child(2)");

//       await columnB.dragAndDrop(columnA);

//       expect(await columnB.getText()).toHaveText("A");
//       expect(await columnA.getText()).toHaveText("B");

//       await columnA.dragAndDrop(columnB);

//       expect(await columnA.getText()).toHaveText("A");
//       expect(await columnB.getText()).toHaveText("B");
//     });
//   });

//   describe("Drag and Drop, negative tests", () => {
//     it("Columns should remain the same order when dragged and dropped not on each other", async () => {
//       const columnA = await $("#columns div:first-child");
//       const columnB = await $("#columns div:nth-child(2)");

//       await columnA.dragAndDrop({ x: 33, y: 300 }, { duration: 1000 });

//       expect(await columnA.getText()).toHaveText("A");
//       expect(await columnB.getText()).toHaveText("B");

//       await columnB.dragAndDrop({ x: 248, y: 300 }, { duration: 1000 });

//       expect(await columnA.getText()).toHaveText("A");
//       expect(await columnB.getText()).toHaveText("B");
//     });

//     it("Column A can't change places with Column B when attribute [draggable] is set to 'false'", async () => {
//       const columns = await $$("#columns div");
//       const columnA = await $("#columns div:first-child");
//       const columnB = await $("#columns div:nth-child(2)");

//       const attributeValue = await columnA.getAttribute("draggable");

//       // Set the 'draggable' attribute of Column A to 'false'.
//       if (attributeValue === "true") {
//         await browser.execute((element) => {
//           element.setAttribute("draggable", "false");
//         }, columnA);
//       }

//       //  initial positions of Column A and Column B.
//       const initialColumnA = await columnA.getLocation();
//       const initialColumnB = await columnB.getLocation();

//       await columnA.dragAndDrop(columnB);

//       // Check if the positions of Column A and Column B remain unchanged.
//       const currentColumnA = await columnA.getLocation();
//       const currentColumnB = await columnB.getLocation();

//       expect(currentColumnA.x).toEqual(initialColumnA.x);
//       expect(currentColumnA.y).toEqual(initialColumnA.y);
//       expect(currentColumnB.x).toEqual(initialColumnB.x);
//       expect(currentColumnB.y).toEqual(initialColumnB.y);
//     });
//   });
// });

// describe("Login Page", () => {
//   beforeEach(async () => {
//     await browser.url("https://the-internet.herokuapp.com/login");
//     await browser.maximizeWindow();
//   });

//   describe("Login and Logout, positive test", () => {
//     it("Should login with valid credentials and logout succesfully", async () => {
//       const usernameInput = await $("//input[@name='username']");
//       const passwordInput = await $("//input[@name='password']");
//       const submitButton = await $("button[type='submit']");
//       const logoutButton = await $("[href='/logout']");
//       const logMessage = await $("#flash");

//       const usernameValue = await $("h4.subheader em:first-child").getText();
//       const passwordValue = await $("h4.subheader em:nth-child(2)").getText();

//       //enter valid credentiials
//       await usernameInput.setValue(usernameValue);
//       await passwordInput.setValue(passwordValue);
//       await waitAndClick(submitButton);

//       //check succesfull login
//       await expect(browser).toHaveUrlContaining("secure");
//       expect(await logMessage.isExisting()).toBe(true);
//       await expect(logMessage).toHaveTextContaining(
//         "You logged into a secure area!"
//       );

//       await browser.refresh();
//       expect(await logMessage.isExisting()).toBe(false);

//       //logout
//       await waitAndClick(logoutButton);
//       //and check
//       await expect(browser).toHaveUrlContaining("login");
//       expect(await logMessage.isExisting()).toBe(true);
//       await expect(logMessage).toHaveTextContaining(
//         "You logged out of the secure area!"
//       );

//       await browser.refresh();
//       expect(await logMessage.isExisting()).toBe(false);
//     });
//   });

//   describe("Login and Logout, negative tests", () => {
//     it("Should trim whitespaces before and after entered values in username input", async () => {
//       const usernameInput = await $("//input[@name='username']");
//       const passwordInput = await $("//input[@name='password']");
//       const submitButton = await $("button[type='submit']");
//       const logMessage = await $("#flash");

//       await usernameInput.setValue("tomsmith");
//       await usernameInput.addValue("\u0020".repeat(5));
//       await passwordInput.setValue("SuperSecretPassword!");
//       await waitAndClick(submitButton);

//       await expect(logMessage).toHaveTextContaining(
//         "You logged into a secure area!"
//       );
//     });

//     it("Should display an error message when wrong username is entered", async () => {
//       const usernameInput = await $("//input[@name='username']");
//       const passwordInput = await $("//input[@name='password']");
//       const submitButton = await $("button[type='submit']");
//       const logMessage = await $("#flash");

//       await usernameInput.setValue("johndoe");
//       await passwordInput.setValue("SuperSecretPassword!");
//       await waitAndClick(submitButton);

//       expect(await logMessage.isExisting()).toBe(true);
//       await expect(logMessage).toHaveTextContaining(
//         "Your username is invalid!"
//       );
//     });

//     it("Should display an error message when wrong password is entered", async () => {
//       const usernameInput = await $("//input[@name='username']");
//       const passwordInput = await $("//input[@name='password']");
//       const submitButton = await $("button[type='submit']");
//       const logMessage = await $("#flash");

//       await usernameInput.setValue("tomsmith");
//       await passwordInput.setValue("wrongPassword!");
//       await waitAndClick(submitButton);

//       expect(await logMessage.isExisting()).toBe(true);
//       await expect(logMessage).toHaveTextContaining(
//         "Your password is invalid!"
//       );
//     });

//     it("Should display an error message when username is not entered", async () => {
//       const passwordInput = await $("//input[@name='password']");
//       const submitButton = await $("button[type='submit']");
//       const logMessage = await $("#flash");

//       await passwordInput.setValue("SuperSecretPassword!");
//       await waitAndClick(submitButton);

//       expect(await logMessage.isExisting()).toBe(true);
//       await expect(logMessage).toHaveTextContaining(
//         "Your username is invalid!"
//       );
//     });

//     it("Should display an error message when password is not entered", async () => {
//       const usernameInput = await $("//input[@name='username']");
//       const submitButton = await $("button[type='submit']");
//       const logMessage = await $("#flash");

//       await usernameInput.setValue("tomsmith");
//       await waitAndClick(submitButton);

//       expect(await logMessage.isExisting()).toBe(true);
//       await expect(logMessage).toHaveTextContaining(
//         "Your password is invalid!"
//       );
//     });

//     it("An error message that indicates an incorrect data entry can be closed and inputs cleared from incorrect values ready for new ineraction", async () => {
//       const submitButton = await $("button[type='submit']");
//       const logMessage = await $("#flash");
//       const closeMessage = await $("a.close");
//       const inputs = await $("input");

//       await waitAndClick(submitButton);

//       expect(await logMessage.isExisting()).toBe(true);
//       await expect(logMessage).toHaveTextContaining(
//         "Your username is invalid!"
//       );

//       //close message
//       await waitAndClick(closeMessage);
//       await logMessage.waitForExist({ reverse: true });

//       expect(await logMessage.isExisting()).toBe(false);
//       await expect(inputs).not.toHaveValue();
//     });
//   });
// });
