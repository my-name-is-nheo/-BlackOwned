import axios from "axios";

async function authUserLogin(token) {
  try {
    const loggedIn = await axios.post("http://192.168.43.49:5000/api/auth", {
      userToken: token,
    });
    return loggedIn.data;
  } catch (error) {
    console.log("This is the error from authUserLogin.js: ", error);
  }
}

export default authUserLogin;
