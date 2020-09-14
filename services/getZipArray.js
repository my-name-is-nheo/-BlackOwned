import axios from "axios";

const getZipArray = (array) => {
  let returnArray = [];
  for (var i = 0; i < array.length; i++) {
    returnArray.push(array[i].zip_code);
  }
  return returnArray;
};

const findLocalBusinesses = async (array) => {
  const nearbyBusinesses = await axios.post(
    `http://192.168.43.49:5000/api/users/db/localBusinesses`,
    { array }
  );
  return nearbyBusinesses.data;
};

module.exports = { getZipArray, findLocalBusinesses };
