const { expect } = require("@wdio/globals");
const AddRemoveElements = require("../po/pages/addRemoveElem.page");
const { waitAndClick } = require("./commands");

// describe("My Login application", () => {
//   it("should login with valid credentials", async () => {
//     await LoginPage.open();

//     await LoginPage.login("tomsmith", "SuperSecretPassword!");
//     await expect(SecurePage.flashAlert).toBeExisting();
//     await expect(SecurePage.flashAlert).toHaveTextContaining(
//       "You logged into a secure area!"
//     );
//   });
// });

describe("Add/Remove Elements App", () => {
  beforeEach(async () => {
    await AddRemoveElements.open();
  });

  it("Should satisfy basic appearance criteria", async () => {
    const title = await $("//body//h3");
    const addButton = await $("button[onclick='addElement()']");

    await expect(title).toHaveText("Add/Remove Elements");
    await expect(addButton).toHaveTextContaining("Add Element");

    const backgroundColor = await addButton.getCSSProperty("background-color");
    const margin = await addButton.getCSSProperty("margin");

    expect(backgroundColor.parsed.hex).toEqual("#2ba6cb");
    expect(margin.value).toEqual("0px 0px 10px 0px");
  });

  it("Button should change the background color when hovered", async () => {
    const button = await $("button[onclick='addElement()']");
    const defaultColor = await button.getCSSProperty("background-color");

    await button.moveTo();

    const isColorChanged = await browser.waitUntil(
      async () => {
        const hoveredColor = await button.getCSSProperty("background-color");

        return defaultColor.value !== hoveredColor.value;
      },
      {
        timeout: 300,
        timeoutMsg: "expected color to be different after 300ms",
      }
    );

    await expect(isColorChanged).toBe(true);
  });

  it("'Delete' button should be added to the page after every click on the 'Add element' button", async () => {
    const addButton = await $("button[onclick='addElement()']");
    const deleteButton = await $$("button.added-manually");
    const elementsBlock = await $("div#elements");

    for (let i = 0; i < 4; i++) {
      await waitAndClick(addButton);
    }

    await expect(elementsBlock).toHaveChildren(4);
    await expect(deleteButton).toBePresent();
  });

  it("'Delete' button should disappear after being clicked", async () => {
    const addButton = await $("button[onclick='addElement()']");
    const deleteButtons = await $("#elements").$$("button.added-manually");
    const elementsBlock = await $("div#elements");

    for (let i = 0; i < 4; i++) {
      await waitAndClick(addButton);
    }

    await $(".added-manually").click();
    await expect(deleteButtons).toBeElementsArrayOfSize(3);

    await Promise.all(
      deleteButtons.map(async (deleteButton) => {
        await waitAndClick(deleteButton);
      })
    );

    await expect(elementsBlock).not.toHaveChildren();
    await expect(deleteButtons).not.toBeExisting();
  });
});
