import axios from "axios";
import token from "../token";
function addLatShrugged(arr) {
  let keys = [];

  var markers = [];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i].geometry !== undefined) {
      const hours = arr[i].opening_hours.weekday_text;

      markers.push({
        name: arr[i].name !== undefined ? arr[i].name : null,
        address:
          arr[i].formatted_address !== undefined
            ? arr[i].formatted_address
            : null,
        lat:
          arr[i].geometry.location.lat !== undefined
            ? arr[i].geometry.location.lat
            : null,
        lng:
          arr[i].geometry.location.lng !== undefined
            ? arr[i].geometry.location.lng
            : null,
        photoArray: arr[i].photos !== undefined ? arr[i].photos : null,
        hours: hours !== undefined ? hours : null,
      });
    }
  }
  return markers;
}

// return await axios
//   .all(requests)
//   .then(
//     axios.spread((...responses) => {
//       responses.forEach((r) => {
//         if (r.data.candidates.length <= 0) {
//           console.log("cannot find place ", r.data); // new Error(`HTTP error! status: ${item.status}`);
//         } else {
//           markers.push({
//             name: r.data.candidates[0].name,
//             place_id: r.data.candidates[0].place_id,
//             address: r.data.candidates[0].formatted_address,
//             lat: r.data.candidates[0].geometry.location.lat,
//             lng: r.data.candidates[0].geometry.location.lng,
//           });
//         }
//       });
//       return markers;
//     })
//   )
//   .catch(function (error) {
//     console.log("ERROR BETCHES", error);
//     if (error.response) {
//       // The request was made and the server responded with a status code
//       // that falls out of the range of 2xx
//       console.log(error.response.data);
//       console.log(error.response.status);
//       console.log(error.response.headers);
//     } else if (error.request) {
//       // The request was made but no response was received
//       // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
//       // http.ClientRequest in node.js
//       console.log(error.request);
//     } else {
//       // Something happened in setting up the request that triggered an Error
//       console.log("Error", error.message);
//     }
//     console.log(error.config);
//   });

export default addLatShrugged;
