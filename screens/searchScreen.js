import React, { useState, useEffect } from "react";
import { ipService } from "../services/ipService";
import { View, Text, SafeAreaView, BackHandler, Button } from "react-native";
import axios from "axios";
// import ip from "../services/ipService";

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ipState: null };
    //   setTimeout(() => {
    //     console.log(this.state.ipState, " this is ip state on Timeout");
    //   }, 2000);
  }

  componentDidMount = () => {
    const ipCall = async () => {
      try {
        // const ipResult = await ip();
        const ipResult = await axios.get(
          "http://localhost:5000/api/businesses/ip"
        );
        console.log(ipResult, " this is ipResult on searchScreen");
        this.setState({ ipState: ipResult });
      } catch (error) {
        console.log("componentDidMount error on searchScreen.js");
      }
    };

    ipCall();
    BackHandler.addEventListener("hardwareBackPress", this.backOne);
  };
  componentWillUnmount = () => {
    BackHandler.removeEventListener("hardwareBackPress", this.backOne);
  };

  whatsIp = async () => {
    console.log("click is working");
    try {
      const ipizzle = await axios.get(
        "http://192.168.43.49:5000/api/businesses/ip"
      );
      console.log(ipizzle, "this passed");

      alert(ipizzle);
    } catch (err) {
      console.log(err, "errr me mateys");
    }
  };

  backOne = () => {
    this.props.noTimeOut();
    this.props.noLoad();
    this.props.history.push(this.props.backOne);
    return true;
  };
  // componentWillMount(){
  //   BackHandler.addEventListener("hardwareBackpress", this.exit)
  // };
  // componentWillUnmount(){
  //   BackHandler.removeEventListener("hardwareBackPress", this.exit)
  // };
  render() {
    return (
      <View style={{ height: 100, width: 100, backGroundColor: "blue" }}>
        <Text>Happy Corona Day!</Text>
        <Button onPress={this.whatsIp} title="ip address"></Button>
      </View>
    );
  }
}
export default Search;

//07/01/2020 - need to set up backend to return ip, create fucking backhandler for every thing
