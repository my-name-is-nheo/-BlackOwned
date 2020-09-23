function cleanAddress(string) {
  let returnString = "";
  for (var i = 0; i < string.length; i++) {
    if (JSON.stringify(Number(string[i])) !== "null" && string[i] !== " ") {
      returnString += string[i];
    } else {
      if (i === 0) {
        returnString += string[i].toUpperCase();
      } else {
        if (string[i - 1] === " " && string[i] !== " ") {
          returnString += string[i].toUpperCase();
        } else {
          returnString += string[i].toLowerCase();
        }
      }
    }
  }

  return returnString;
}
export default cleanAddress;
