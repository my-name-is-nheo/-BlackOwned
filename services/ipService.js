import axios from "axios";

export const myIp = "http://192.168.43.49:5000";
export async function ip() {
  try {
    console.log("entered try");
    var ipAddress = await axios.get("https://api.ipify.org");
    console.log("exited try");
    return ipAddress.data;
  } catch (err) {
    console.log(err, "IpTest Failed in ipService.js");
  }
}
