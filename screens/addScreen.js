import React, { useState, useEffect } from "react";

import {
  View,
  Text,
  SafeAreaView,
  BackHandler,
  TouchableOpacity,
  Button,
} from "react-native";

class AddScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { add: null };
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
      <View>
        <TouchableOpacity>
          <View style={{ height: 100, width: 100, backGroundColor: "blue" }}>
            <Text>This is Add Screen</Text>
          </View>
        </TouchableOpacity>
        <Button
          onPress={() => {
            this.props.history.push("/register");
          }}
          title="Test Back"
        />
      </View>
    );
  }
}
export default AddScreen;

//07/01/2020 - need to set up backend to return ip, create fucking backhandler for every thing
