import axios from "axios";
import token from "../token";
async function getGoogleBusinessesData(arr, userCoordinates) {
  return arr.map(async (item, i) => {
    try {
      const address =
        item.addressLn1 +
        item.addressLn2 +
        item.city +
        item.state +
        item.zipcode;
      // console.log(address, " this shoud look like a normal address ");
      const uriEncodedAddress = encodeURI(address); //address);

      const r = await axios.get(
        `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${uriEncodedAddress}&inputtype=textquery&fields=photos,formatted_address,name,place_id,geometry,opening_hours,rating&locationbias=circle:500@${userCoordinates.latitude},${userCoordinates.longitude}&key=${token.googleApi}`

        // `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${uriEncoded}&inputtype=textquery&fields=photos,formatted_address,name,place_id,geometry,opening_hours,rating&locationbias=circle:500@${userCoordinates.latitude},${userCoordinates.longitude}&key=${token.googleApi}`
        // `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${uriEncodedAddress}&inputtype=textquery&fields=icon,type,photos,formatted_address,name,place_id,geometry,opening_hours,rating&locationbias=circle:2000@47.6918452,-122.2226413&key=${token.googleApi}`
      );

      console.log("r", r);
      if (r.data.candidates.length > 0) {
        var info = r.data.candidates[0];

        console.log("info", info);
        return {
          ...item,
          address: info.formatted_address,
          //          addressLn1: info.addressLn1,
          place_id: info.place_id,
          lat: info.geometry.location.lat,
          lng: info.geometry.location.lng,
          rating: info.rating,
          type: info.type,
          icon: info.icon ? info.icon : null,
          photos: info.photos,
          opening_hours: info.opening_hours,
          rating: info.rating,
        };
      } else {
        console.log(
          item.name + " " + item.address + " not found in google maps api"
        );
        return item;
      }
    } catch (error) {
      console.log(error, "This is your error from getGoogleBusinessesData.js");
    }
  });
}

export default getGoogleBusinessesData;

/* import axios from "axios";
import token from "../token";
async function getMarkers(arr, userCoordinates) {
  const requests = [];

  arr.map((item) => {
    const address = item.address + " " + item.city + " " + item.zipcode;
    const uriEncoded = encodeURI(item.name);
    //limit requests for now so things are faster
    if (requests.length < 10)
      requests.push(
        axios.get(
          `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${uriEncoded}&inputtype=textquery&fields=photos,formatted_address,name,place_id,geometry,opening_hours,rating&locationbias=circle:500@${userCoordinates.latitude},${userCoordinates.longitude}&key=${token.googleApi}`
        )
      );
  });
  var markers = [];
  return await axios
    .all(requests)
    .then((responses) => {
      //      axios.spread((...responses) => {
      responses.map((r) => {
        if (r.data.candidates.length <= 0) {
          console.log("cannot find place ", r.data); // new Error(`HTTP error! status: ${item.status}`);
        } else {
          markers.push({
            name: r.data.candidates[0].name,
            address: r.data.candidates[0].formatted_address,
            place_id: r.data.candidates[0].place_id,
            lat: r.data.candidates[0].geometry.location.lat,
            lng: r.data.candidates[0].geometry.location.lng,
          });
        }
      });
      return markers;
    })

    .catch(function (error) {
      console.log("ERROR BETCHES", error);
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
      console.log(error.config);
    });
}

export default getMarkers;
 */
