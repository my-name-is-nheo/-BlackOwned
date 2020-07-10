import React, { useState, useEffect } from "react";

import {
  View,
  Text,
  StatusBar,
  BackHandler,
  TextInput,
  Button,
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
    // this.inputsArray = [
    //   {
    //     placeholder: "First Name",
    //     value: this.state.firstName,
    //     onChange: this.handleLastName,
    //   },
    //   {
    //     placeholder: " Last Name",
    //     value: this.state.lastName,
    //     onChange: this.handleLastName,
    //   },
    //   {
    //     placeholder: "Email",
    //     value: this.state.email,
    //     onChange: this.handleEmail,
    //   },
    //   {
    //     placeholder: "Password",
    //     value: this.state.password,
    //     onChange: this.handlePassword,
    //   },
    // ];

    // this.mappedInputs = this.inputsArray.map((item, i) => {
    //   return (
    //     <TextInput
    //       style={{
    //         marginTop: i === 0 ? 100 : 50,
    //         borderBottomWidth: 2.5,
    //         width: "50%",
    //       }}
    //       onChangeText={item.onChange}
    //       value={item.value}
    //       placeholder={item.placeholder}
    //     />
    //   );
    // });
  }

  returnMappedInputs = () => {
    const inputsArray = [
      {
        placeholder: "First Name",
        value: this.state.firstName,
        onChange: this.handleLastName,
      },
      {
        placeholder: " Last Name",
        value: this.state.lastName,
        onChange: this.handleLastName,
      },
      {
        placeholder: "Email",
        value: this.state.email,
        onChange: this.handleEmail,
      },
      {
        placeholder: "Password",
        value: this.state.password,
        onChange: this.handlePassword,
      },
    ];
    const mappedInputs = inputsArray.map((item, i) => {
      return (
        <TextInput
          key={i}
          style={{
            marginTop: i === 0 ? 100 : 50,
            borderBottomWidth: 2.5,
            width: "50%",
          }}
          onChangeText={item.onChange}
          value={item.value}
          placeholder={item.placeholder}
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
    this.setState({ passwor: text });
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
            Sign up here to be to keep track of your favorite local black-owned
            businesses, pressure your representatives, and more!
          </Text>
        </View>
        <View style={{ alignItems: "center" }}>
          {this.returnMappedInputs()}
        </View>
        <Button title="Submit" />
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
