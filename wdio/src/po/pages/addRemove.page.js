const BasePage = require("./base.page");
const { AddComponent, DeleteComponent } = require("../components");

class AddRemovePage extends BasePage {
  constructor() {
    super("/add_remove_elements/");
    this.addComponent = new AddComponent();
    this.deleteComponent = new DeleteComponent();
  }
}

module.exports = AddRemovePage;
