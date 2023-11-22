const BaseComponent = require("../common/base.component");
const Button = require("../../../controls/button");

class AddComponent extends BaseComponent {
  constructor() {
    super();
  }

  get title() {
    return $("//body//h3");
  }

  get addButton() {
    return new Button("button[onclick='addElement()']");
  }
}

module.exports = AddComponent;
