const { Linking } = require("react-native");

const goToURL = function (url) {
  Linking.canOpenURL(url).then((supported) => {
    if (supported) {
      console.log("got to is supported");
      Linking.openURL(url);
    } else {
      console.log("Don't know how to open URI: " + url);
    }
  });
};

module.exports = goToURL;
