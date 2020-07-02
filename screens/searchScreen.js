import React, { useState, useEffect } from "react";
import { ipService } from "../services/ipService";
import { View, Text, SafeAreaView, BackHandler, Button } from "react-native";
import axios from "axios";
import { ip } from "../services/ipService";

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
        const ipResult = await ip();
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

  backOne = () => {
    this.props.noTimeOut();
    this.props.noLoad();
    this.props.history.push(this.props.backOne);
    return true;
  };

  render() {
    return (
      <View
        style={{
          top: 200,
          flex: 1,
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
          height: 100,
          width: 100,
          backGroundColor: "blue",
        }}
      >
        <Text>Happy Corona Day!</Text>
      </View>
    );
  }
}
export default Search;

//07/01/2020 - need to set up backend to return ip, create fucking backhandler for every thing
