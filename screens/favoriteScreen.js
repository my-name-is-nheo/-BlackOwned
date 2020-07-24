import React, { useState, useEffect } from "react";
import { Avatar } from "react-native-elements";
import {
  View,
  Text,
  SafeAreaView,
  BackHandler,
  Dimensions,
} from "react-native";

class FavoriteScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { favorite: null };
    this.width = Math.round(Dimensions.get("window").width);
    this.height = Math.round(Dimensions.get("window").height);
    this.listItems = [
      {
        name: "Nick's Sushi",
        liked: true,
        category: "Restaurant",
        rating: 4.7,
      },
      {
        name: "Andres69",
        liked: true,
        category: "Resturant - Strip Club",
        rating: 0.2,
      },
      {
        name: "Nick's Stripclub",
        liked: true,
        category: "Adult Cabaret",
        rating: 4.1,
      },
    ];
  }

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
  mapFavorites = (arr) => {
    return arr.map((item, i) => {
      return (
        <View
          key={i}
          style={{
            padding: 40,
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
          }}
        >
          <Avatar rounded title="MD" />
          <Text>{item.name}</Text>
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
        {this.mapFavorites(this.listItems)}
      </View>
    );
  }
}
export default FavoriteScreen;

//07/01/2020 - need to set up backend to return ip, create fucking backhandler for every thing
