import axios from "axios";
import token from "../token";
async function addLatShrugged(arr, userCoordinates) {
  const requests = [];

  arr.map((item) => {
    // const address = item.address + " " + item.city + " " + item.zipcode;
    const uriEncodedBusiness = encodeURI(item.name); //address);
    //limit requests for now so things are faster
    //   if (requests.length < 10)
    requests.push(
      axios.get(
        `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${uriEncodedBusiness}&inputtype=textquery&fields=photos,formatted_address,name,place_id,geometry,opening_hours,rating&locationbias=circle:500@${userCoordinates.latitude},${userCoordinates.longitude}&key=${token.googleApi}`
      )
    );
  });

  var markers = [];
  return await axios
    .all(requests)
    .then(
      axios.spread((...responses) => {
        responses.forEach((r) => {
          if (r.data.candidates.length <= 0) {
            console.log("cannot find place ", r.data); // new Error(`HTTP error! status: ${item.status}`);
          } else {
            console.log("r data", r.data.candidates[0]);

            markers.push({
              name: r.data.candidates[0].name,
              place_id: r.data.candidates[0].place_id,
              address: r.data.candidates[0].formatted_address,
              lat: r.data.candidates[0].geometry.location.lat,
              lng: r.data.candidates[0].geometry.location.lng,
            });
          }
        });
        console.log(markers, "this is markers");
        return markers;
      })
    )
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

export default addLatShrugged;
