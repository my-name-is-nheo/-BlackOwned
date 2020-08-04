import axios from "axios";
import token from "../token";
async function addLatShrugged(arr) {
  return arr.map(async (item, i) => {
    try {
      const address = item.address + " " + item.city + " " + item.zipcode;
      // console.log(address, " this shoud look like a normal address ");
      const uriEncodedAddress = encodeURI(address);

      const googleMapApi = await axios.get(
        `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${uriEncodedAddress}&inputtype=textquery&fields=photos,formatted_address,name,place_id,geometry,opening_hours,rating&locationbias=circle:2000@47.6918452,-122.2226413&key=${token.googleApi}`
      );
      // console.log(googleMapApi.data, "this is what we're returning in gmap");
      const returnObject = {};
      returnObject.name = item.name;
      returnObject.place_id = googleMapApi.data.candidates[0].place_id;
      returnObject.markers = googleMapApi.data.candidates[0].geometry.location;
      return returnObject;
    } catch (error) {
      console.log(error, "This is your error from addLatShrugged.js");
    }
  });
}

export default addLatShrugged;
