import axios from "axios";
import tokens from "../token";
export default async function (query) {
  try {
    const searchResults = await axios.get(`http://api.serpstack.com/search
    ? access_key =${tokens.serpApi}
    & engine = google
    & query = ${query}`);
  } catch (err) {
    console.log(err, "There has been an error in BusinessSearch.js");
  }
}
