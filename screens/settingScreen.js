import React, { useState, useEffect } from "react";

import { View, Text, SafeAreaView, BackHandler } from "react-native";

class SettingScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { setting: null };
  }

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

  render() {
    return (
      <View style={{ height: 100, width: 100, backGroundColor: "blue" }}>
        <Text>This is Setting Screen</Text>
      </View>
    );
  }
}
export default SettingScreen;
