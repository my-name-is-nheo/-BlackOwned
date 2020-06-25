import axios from "axios";

export default async function IpTest() {
  try {
    console.log("IP TEST running");
    var nick = await axios.get("http://localhost:3333/getIp");
    console.log(" this is Nick from test.js", nick.data);
  } catch (err) {
    console.log("IpTest Failed");
  }
}
