module.exports = {
  waitAndClick: async function (element) {
    element.waitForExist({
      timeout: 1000,
      timeoutMsg: "Desired element did not appear",
    });
    element.waitForDisplayed({
      timeout: 1000,
      timeoutMsg: "Desired element did not display",
    });
    element.click();
  },
};
