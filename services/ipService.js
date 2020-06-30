import axios from "axios";
export default async function ip() {
  try {
    console.log("IP TEST running in ipService.js");
    var ipAddress = await axios.get("http://localhost:3333/getIp");
    return ipAddress.data;
  } catch (err) {
    console.log("IpTest Failed in ipService.js");
  }
}
