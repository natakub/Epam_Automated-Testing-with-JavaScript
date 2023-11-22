const BaseComponent = require("../common/base.component");
const Button = require("../../../controls/button");

class DeleteComponent extends BaseComponent {
  constructor() {
    super("#elements");
  }

  get deleteButton() {
    return new Button("button.added-manually");
  }
}

module.exports = DeleteComponent;
