const Page = require("./page");

class AddRemoveElements extends Page {
  async open() {
    await super.open("add_remove_elements/");
  }
}

module.exports = new AddRemoveElements();
