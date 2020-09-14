import axios from "axios";
import token from "../token";

const zipcodes = async (zip, radius) => {
  try {
    // var zips = await axios.get(
    //   `https://www.zipcodeapi.com/rest/${token.zipCodeApi}/radius.json/${zip}/${radius}/km`
    // );
    // return zips.data;
    return ["07832", "91301", "29061", "20904"];
  } catch (err) {
    console.log(err, "err getting zips on services/getZipcodes.js");
  }
};

module.exports = zipcodes;
