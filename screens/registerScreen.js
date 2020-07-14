import React, { useState, useEffect } from "react";
import { Button as muiButton } from "react-native-material-ui";
import { TextField as MuiTextfield } from "react-native-materialui-textfield";

import {
  View,
  Text,
  StatusBar,
  BackHandler,
  TextInput,
  Button,
  AsyncStorage,
  Image,
} from "react-native";

class RegisterScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      setting: null,
      firstName: "",
      lastName: "",
      password: "",
      email: "",
    };
  }

  returnMappedInputs = () => {
    const inputsArray = [
      {
        label: "First Name",
        value: this.state.firstName,
        onChange: this.handleLastName,
      },
      {
        label: "Last Name",
        value: this.state.lastName,
        onChange: this.handleLastName,
      },
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
          label={item.label}
          editable={true}
        />
      );
    });
    return mappedInputs;
  };

  componentDidMount = () => {
    BackHandler.addEventListener("hardwareBackPress", this.backOne);
  };
  componentWillUnmount = () => {
    BackHandler.removeEventListener("hardwareBackPress", this.backOne);
  };

  backOne = () => {
    this.props.noTimeOut();
    this.props.noLoad();
    this.props.history.push(this.props.backOne);
    return true;
  };
  handleFirstName = (text) => {
    this.setState({ firstName: text });
  };
  handleLastName = (text) => {
    this.setState({ lastName: text });
  };
  handleEmail = (text) => {
    this.setState({ email: text });
  };
  handlePassword = (text) => {
    this.setState({ password: text });
  };
  handleSubmit = async () => {
    try {
      await AsyncStorage.setItem("ballsacks", "Taste salty");
      const ballsacks = await AsyncStorage.getItem("ballsacks");
      console.log(ballsacks, " successfully retrieved from AsyncStorage");
    } catch (err) {
      console.log("backsacks was not saved to AsyncStorage");
    }
  };

  /*
  We'll collect all of the data in state and create an object as our payload to send 
  via a service to a post route for registration that we'll create in the backend.

  Upon creation of registration, user will be given a token that authenticates them 
  as a user for the next thirty days from their last log in (so after thirty days of 
    inactivity, they'll need to sign in again).

    We'll set this token to innerStorage (but the async type)

    Provide feedback on whether or not password and username fields are being correctly 
    created

  */
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
            Sign up here to be to keep track of your favorite local black-owned
            businesses, pressure your representatives, and more!
          </Text>
        </View>
        <View style={{ marginLeft: 100, width: "50%" }}>
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
        </View>
      </View>
    );
  }
}
export default RegisterScreen;

/*
A square that inside says: Sign up here to be to keep track of your favorite local black-owned businesses, pressure your representatives, and more!

input fields

profile picture



email address

password

confirm password


*/
