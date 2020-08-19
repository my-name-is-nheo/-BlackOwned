import React, { useState, useEffect } from "react";
import { Button, Avatar } from "react-native-elements";
import {
  View,
  Text,
  BackHandler,
  Dimensions,
  AsyncStorage,
} from "react-native";
import axios from "axios";

// import Icon from "react-native-vector-icons/MaterialIcons";

class FillDb extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      favorite: null,
    };
    this.width = Math.round(Dimensions.get("window").width);
    this.height = Math.round(Dimensions.get("window").height);
  }

  componentDidMount = () => {
    console.log(this.props.backValue, " This is the backvalue");

    if (!this.props.backValue) {
      this.props.updateHistory(this.props.history.location.pathname);
    }

    BackHandler.addEventListener("hardwareBackPress", this.backOne);
  };
  componentWillUnmount = () => {
    BackHandler.removeEventListener("hardwareBackPress", this.backOne);
  };
  mapFavorites = (arr) => {
    return arr.map((item, i) => {
      return (
        <View
          key={i}
          style={{
            padding: 0,
            justifyContent: "center",
            alignItems: "center",
            alignContent: "center",
            marginBottom: 10,
            borderRadius: 20,
            height: this.height / 5,
            marginRight: this.width / 19,
            marginLeft: this.width / 19,
            width: (this.width / 19) * 18,
            backgroundColor: "green",
            flexDirection: "row",
          }}
        >
          <View style={{ width: "50%", backgroundColor: "pink" }}>
            <Avatar rounded icon={{ name: "restaurant" }} size="large" />
          </View>
          <View
            style={{
              backgroundColor: "grey",
              width: "50%",
              flexDirection: "column",
            }}
          >
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={{ fontSize: 15 }}>{item.name}</Text>
              <Avatar
                onPress={() => {
                  this.handleHeartPress(i);
                }}
                rounded
                size="medium"
                icon={{ name: "favorite" }}
              />
            </View>
            <Text>{item.rating}</Text>
          </View>
        </View>
      );
    });
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
  handleApi = async () => {
    try {
      console.log("You've entered the correct function");
      const allData = await axios.get(
        "https://api.data.gov/sam/v3/registrations?qterms=minorityOwned:true&OY&api_key=9ixRFemUBpKWnTmmciB6SQ4ecGJwGeLZiqlh2XR7&start=1&length=1000"
      );
      await AsyncStorage.setItem(
        "callData",
        JSON.stringify(allData.data.results)
      );
    } catch (error) {}
    //    axios.post("http://192.168.43.49:5000/api/users/testModel",{})
  };

  render() {
    return (
      <View
        style={{
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          backGroundColor: "blue",
        }}
      >
        <Button onPress={this.handleApi} title={"Fill DB"} />
        <Text>When da button get a pressed, da Db a getta filled...</Text>
      </View>
    );
  }
}
export default FillDb;

//07/01/2020 - need to set up backend to return ip, create fucking backhandler for every thing
