const { expect } = require("@wdio/globals");
const { pages } = require("../po");

describe("Add/Remove Elements App", () => {
  beforeEach(async () => {
    await pages("addRemoveElem").open();
  });

  it("Should satisfy basic appearance criteria", async () => {
    const addComponent = pages("addRemoveElem").addComponent;

    await expect(addComponent.title).toHaveText("Add/Remove Elements");
    await expect(addComponent.addButton.element).toHaveTextContaining(
      "Add Element"
    );

    const buttonProperties = await addComponent.getCSSfromElement(
      addComponent.addButton.element,
      "background-color",
      "margin"
    );

    await expect(buttonProperties[0].parsed.hex).toEqual("#2ba6cb");
    await expect(buttonProperties[1].value).toEqual("0px 0px 10px 0px");
  });

  it("Button should change the background color when hovered", async () => {
    const addComponent = pages("addRemoveElem").addComponent;
    const addButtonElement = addComponent.addButton.element;

    //using isChangeColorWhenHovered() method from BaseComponent to check if our "Add Element" button will change color when hovered and expect it to return "true"
    expect(await addComponent.isChangeColorWhenHovered(addButtonElement)).toBe(
      true
    );
  });

  it("'Delete' button should be added to the page after every click on the 'Add element' button", async () => {
    const addRemovePage = pages("addRemoveElem");

    await addRemovePage.addComponent.addButton.clickMultipleTimes(4);

    await expect(addRemovePage.deleteComponent.rootEl).toHaveChildren(4);
    await expect(
      addRemovePage.deleteComponent.deleteButton.elements
    ).toBePresent();
  });

  it("'Delete' button should disappear after being clicked", async () => {
    const addRemovePage = pages("addRemoveElem");

    await addRemovePage.addComponent.addButton.clickMultipleTimes(4);
    await addRemovePage.deleteComponent.deleteButton.waitAndClick();

    const deleteButtons = addRemovePage.deleteComponent.deleteButton.elements;

    await expect(deleteButtons).toBeElementsArrayOfSize(3);

    deleteButtons.map(async (deleteButton) => {
      try {
        await deleteButton.click();
      } catch (error) {
        console.error(`Error clicking delete button: ${error}`);
      }
    });

    await expect(addRemovePage.deleteComponent.rootEl).not.toHaveChildren();
    await expect(deleteButtons).not.toBeExisting();
  });
});
