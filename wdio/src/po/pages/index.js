const AlertsPage = require("./alerts.page");
const AddRemovePage = require("./addRemove.page");

/**
 * @param name {"alerts" | "addRemoveElem"}
 * @returns {AlertsPage | AddRemovePage}
 */
function pages(name) {
  const items = {
    alerts: new AlertsPage(),
    addRemoveElem: new AddRemovePage(),
  };

  return items[name];
}

module.exports = {
  AlertsPage,
  AddRemovePage,
  pages,
};
