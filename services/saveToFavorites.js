import axios from "axios";

async function saveToFavorites(payload) {
  try {
    const addToFavorites = await axios.post(
      "http://192.168.43.49:5000/api/favorites",
      payload
    );
    return addToFavorites.data;
  } catch (error) {
    console.log(error, "There is an error at saveToFavorites");
  }
}

export default saveToFavorites;
