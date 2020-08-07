import axios from "axios";
import token from "../token";
async function addLatShrugged(arr, userCoordinates) {
  return arr.map(async (item, i) => {
    try {
      const address = item.address + " " + item.city + " " + item.zipcode;
      // console.log(address, " this shoud look like a normal address ");
      const uriEncodedAddress = encodeURI(address);

      const googleMapApi = await axios.get(
        `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${uriEncoded}&inputtype=textquery&fields=photos,formatted_address,name,place_id,geometry,opening_hours,rating&locationbias=circle:500@${userCoordinates.latitude},${userCoordinates.longitude}&key=${token.googleApi}`
        //        `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${uriEncodedAddress}&inputtype=textquery&fields=photos,formatted_address,name,place_id,geometry,opening_hours,rating&locationbias=circle:2000@47.6918452,-122.2226413&key=${token.googleApi}`
      );
      // console.log(googleMapApi.data, "this is what we're returning in gmap");

      if (googleMapApi.data.candidates.length > 0) {
        return {
          name: item.name,
          address: r.data.candidates[0].formatted_address,
          place_id: r.data.candidates[0].place_id,
          lat: r.data.candidates[0].geometry.location.lat,
          lng: r.data.candidates[0].geometry.location.lng,
        };
      } else {
        console.log(
          item.name + " " + item.address + " not found in google maps api"
        );
        return null;
      }
    } catch (error) {
      console.log(error, "This is your error from addLatShrugged.js");
    }
  });
}

export default addLatShrugged;
