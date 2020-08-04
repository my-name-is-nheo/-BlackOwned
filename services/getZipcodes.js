import axios from "axios";
import token from "../token";

const zipcodes = async (zip, radius) => {
  try {
    var zips = await axios.get(
      `https://www.zipcodeapi.com/rest/${token.zipCodeApi}/radius.json/${zip}/${radius}/km`
    );
    return zips.data;
  } catch (err) {
    console.log(err, "err getting zips on services/getZipcodes.js");
  }
};

module.exports = zipcodes;
