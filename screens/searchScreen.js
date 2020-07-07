import React, { useState, useEffect } from "react";
import { ipService } from "../services/ipService";
import {
  View,
  Text,
  SafeAreaView,
  BackHandler,
  Button,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import { ip } from "../services/ipService";
import businessSearch from "../services/businessSearch";
import tokens from "../token";
import { MaterialIcons } from "@expo/vector-icons";
import HyperLink from "./../services/urlService";

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = { nearbyBusinesses: [] };
  }

  componentDidMount = () => {
    const ipCall = async () => {
      try {
        const ipResult = await ip();
        var userLocation = await axios.get(
          `http://ip-api.com/json/38.106.217.167`
        ); // `http://ip-api.com/json/${ipResult}`
        const currentCity = userLocation.data.city;
        const businesses = await axios.get(tokens.samApi);
        const groomedArray = this.usefulInfo(businesses.data.results);
        const nearbyBusinesses = this.searchAroundMe(groomedArray, currentCity);
        this.setState({ nearbyBusinesses });
      } catch (error) {
        console.log(error, "componentDidMount error on searchScreen.js");
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

  listResults = (arr) => {
    const results = arr.map((place, i) => {
      return (
        <View key={i} style={{ alignItems: "center" }}>
          <Text
            onPress={() => {
              console.log("pressed button on text");
            }}
            style={{
              color: "white",
              textDecorationLine: "underline",
              lineHeight: 60,
            }}
          >
            {place.name}
          </Text>
        </View>
      );
    });
    if (results.length === 0) {
      return (
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <MaterialIcons name="error" size={100} color="black" />
          <Text style={{ marginTop: 20, fontSize: 20, marginBottom: 40 }}>
            No businesses found in your area!
          </Text>
          <HyperLink
            title={
              "Click here to donate towards the growth of black-owned enterprises"
            }
            url={
              "https://www.gofundme.com/f/protesters-and-bond-funds?fbclid=IwAR33GbMbn-7YN-w0Xh5YBNoFf1_48RGToeinYeXOaqJUl7xrYWbbm1c2E5E"
            }
          />
        </View>
      );
    }
    return results;
  };
  searchAroundMe = (arr, ipCity) => {
    const lcCity = ipCity.toLowerCase();
    const newArr = [];
    for (var index = 0; index < arr.length; index++) {
      const arrCityName = arr[index].city.toLowerCase();
      if (arrCityName === lcCity) {
        newArr.push(arr[index]);
      }
    }
    return newArr;
  };

  evaluateListReturn = (callback) => {
    const results = callback(this.state.nearbyBusinesses);
    if (Array.isArray(results)) {
      return 3;
    } else {
      return 100;
    }
  };
  usefulInfo = (arr) => {
    const mapInfo = arr.map((element) => {
      let infoObj = {
        name: element.legalBusinessName,
        city: element.samAddress.city,
        zipcode: element.samAddress.zip,
      };
      return infoObj;
    });
    return mapInfo;
  };

  // createList = (arr) => {
  //   arr.map((element) => {
  //     return <Button title={element.name}></Button>;
  //   });
  // };

  //Let's get bizzy!
  //Below is a list of black-owned businesses near you!

  render() {
    return (
      <View
        style={{
          paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
          backgroundColor: "#fc5c65",
          // justifyContent: "center",

          alignContent: "center",
          paddingLeft: 0,
          paddingRight: 0,
          alignItems: "center",
          height: "100%",
          width: "100%",
        }}
      >
        <View
          style={{
            backgroundColor: "#fc5c65",
            top: 40,
            backgroundColor: "white",
            height: "20%",
            width: "100%",
            borderRadius: 30,
            alignContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ marginBottom: 10, fontWeight: "bold", fontSize: 40 }}>
            Get bizzed!
          </Text>

          <View>
            <Text style={{ fontSize: 30 }}>👨🏾‍🦲👩🏾‍🦰👩🏿‍🦱👵🏾🧑🏾‍🧓🏾👴🏾👨🏾‍🦱👱🏾👩🏾‍🦲</Text>
            <Text style={{ left: 10, fontSize: 16, fontWeight: "600" }}>
              Below is a list of black-owned businesses near you!
            </Text>

            <View
              style={{
                marginTop: this.evaluateListReturn(this.listResults),
              }}
            ></View>
          </View>
        </View>
        {this.listResults(this.state.nearbyBusinesses)}
      </View>
    );
  }
}
export default Search;
