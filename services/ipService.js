import axios from "axios";
export default async function ip() {
  try {
    console.log("IP TEST running in ipService.js");
    var ipAddress = await axios.get("http://localhost:5000/api/businesses/ip");
    console.log(ipAddress, " This is ipenis");
    return ipAddress.data;
  } catch (err) {
    console.log(err, "IpTest Failed in ipService.js");
  }
}
