import React, { useState, useEffect } from "react";
import { ipService } from "../services/ipService";
import { View, Text, SafeAreaView, BackHandler } from "react-native";

import ip from "../services/ipService";

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ipState: null };
  }

  componentDidMount = () => {
    const ipCall = async () => {
      try {
        const ipResult = await ip();
        setIpState(ipResult);
      } catch (error) {}
    };

    BackHandler.addEventListener("hardwareBackPress", this.backOne);
    ipCall();
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
      </View>
    );
  }
}
export default Search;
