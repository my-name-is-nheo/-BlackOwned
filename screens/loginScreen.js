import React from "react";
import { TextField as MuiTextfield } from "react-native-materialui-textfield";
import axios from "axios";
import {
  View,
  Text,
  StatusBar,
  BackHandler,
  TextInput,
  Button,
  AsyncStorage,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";

class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.screenWidth = Math.round(Dimensions.get("window").width);
    this.state = { email: "", password: "" };
  }

  returnMappedInputs = () => {
    const inputsArray = [
      {
        label: "Email",
        value: this.state.email,
        onChange: this.handleEmail,
      },
      {
        label: "Password",
        value: this.state.password,
        onChange: this.handlePassword,
      },
    ];
    const mappedInputs = inputsArray.map((item, i) => {
      return (
        <MuiTextfield
          key={i}
          activeLineWidth={3}
          onChangeText={(e) => {
            item.onChange(e);
          }}
          label={item.label}
          editable={true}
        />
      );
    });
    return mappedInputs;
  };

  componentDidMount = () => {
    console.log("compound did mount ran");
    console.log(this.props.backValue, " This is the backvalue");

    if (!this.props.backValue) {
      this.props.updateHistory(this.props.history.location.pathname);
    }

    BackHandler.addEventListener("hardwareBackPress", this.backOne);
  };
  componentWillUnmount = () => {
    BackHandler.removeEventListener("hardwareBackPress", this.backOne);
  };

  backOne = () => {
    this.props.noTimeOut();
    this.props.noLoad();
    this.props.cameFromBack(true);
    this.props.history.push(this.props.back);
    this.props.fixHistory(this.props.back);
    this.props.history.push(this.props.backOne);
    return true;
  };

  handleEmail = (text) => {
    this.setState({ email: text });
  };
  handlePassword = (text) => {
    this.setState({ password: text });
  };
  handleSubmit = async () => {
    try {
      const payload = { ...this.state };
      const postToken = await axios.post(
        "http://192.168.43.49:5000/api/userLogin/",
        payload
      );

      const token = postToken.headers["x-auth-token"];
      // console.log("got past token");
      await AsyncStorage.setItem("userToken", token);
      // console.log("Got past storage");
      this.props.noTimeOut();
      setTimeout(() => {
        this.props.history.push("/");
      }, 500);
    } catch (err) {
      if (err.response.data === "banned") {
        this.props.cameFromBack(false);

        this.props.history.push("/banned");
      }
      console.log(err.response.data, "axios post failed");
    }
  };
  registerClick = () => {
    this.props.cameFromBack(false);
    this.props.history.push("/register");
  };

  render() {
    return (
      <View
        style={{
          paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
          height: "100%",
          width: "100%",
        }}
      >
        <View
          style={{
            paddingTop: 25,
            borderRadius: 40,
            height: "20%",
            backgroundColor: "pink",
          }}
        >
          <Text style={{ fontSize: 20, textAlign: "center" }}>
            Welcome! Log In or Sign Up!
          </Text>
        </View>
        <View
          style={{
            marginLeft: this.screenWidth / 5,
            width: (this.screenWidth / 5) * 3,
          }}
        >
          {this.returnMappedInputs()}
        </View>
        <View
          style={{
            marginTop: 60,
            borderRadius: "55%",
            width: "100%",
            alignItems: "center",
          }}
        >
          <Button title="Submit" onPress={this.handleSubmit} />
          <TouchableOpacity
            style={{
              marginTop: 20,
              borderRadius: 10,
              backgroundColor: "#2196f3",
            }}
            onPress={this.registerClick}
          >
            <View>
              <Text style={{ color: "white", fontSize: 20 }}>
                {"   "}
                Click here to Register!{"   "}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
export default LoginScreen;

//07/01/2020 - need to set up backend to return ip, create fucking backhandler for every thing
