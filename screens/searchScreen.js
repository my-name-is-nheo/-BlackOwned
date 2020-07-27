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
import goToUrl from "../services/goToUrl";
import { WebBrowserResultType } from "expo-web-browser";
import { Avatar } from "react-native-elements";
import saveToFavorites from "./../services/saveToFavorites";

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = { nearbyBusinesses: null };
  }

  componentDidMount = () => {
    const ipCall = async () => {
      try {
        const ipResult = await ip();
        var userLocation = await axios.get(
          `http://ip-api.com/json/38.106.217.167` // will eventually load
        ); // `http://ip-api.com/json/${ipResult}`
        const currentCity = userLocation.data.city;
        const businesses = await axios.get(tokens.samApi);
        // console.log(businesses, "here be the biz");
        const groomedArray = this.usefulInfo(businesses.data.results);
        const nearbyBusinesses = this.searchAroundMe(groomedArray, currentCity);
        this.setState({ nearbyBusinesses });
      } catch (error) {
        console.log(error, "componentDidMount error on searchScreen.js");
      }
    };

    ipCall();
    if (!this.props.backValue) {
      this.props.updateHistory(this.props.history.location.pathname);
    }
    BackHandler.addEventListener("hardwareBackPress", this.backOne);
  };
  componentWillUnmount = () => {
    BackHandler.removeEventListener("hardwareBackPress", this.backOne);
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
  handleHeartPress = (i) => {
    this.props.handleHeartPress(i);
  };
  listResults = (input) => {
    if (input === null) {
      return (
        <View style={{ alignItems: "center" }}>
          <Text>Space for Animation</Text>
        </View>
      );
    }

    const results = input.map((place, i) => {
      return (
        <View
          key={i}
          style={{
            alignItems: "center",
            marginTop: 10,
          }}
        >
          <View
            style={{ flexDirection: "row", borderWidth: 0.4, paddingLeft: 15 }}
          >
            <Text
              onPress={this.googleSearch}
              value={place.name}
              style={{
                color: "white",
                textDecorationLine: "underline",
                lineHeight: 60,
              }}
            >
              {place.name}
            </Text>
            <Avatar
              onPress={() => {
                this.handleHeartPress(i);
                setTimeout(async () => {
                  if (this.props.heartPressed[i]) {
                    const payload = {
                      ...place,
                      heartPressed: this.props.heartPressed[i],
                    };
                    await saveToFavorites(payload);
                  }
                }, 1000);
              }}
              rounded
              icon={{
                name:
                  this.props.heartPressed[i] === true
                    ? "favorite"
                    : "favorite-border",
              }}
            />
          </View>
        </View>
      );
    });
    if (input.length === 0) {
      return (
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
          }}
        >
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

  //press and activate the heart
  //At the same time, we'll save a datapayload about our liked item to the back
  //end
  //{name, how many likes or dislikes, location, google search link}
  //favorite page , get request to mongo container

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
      return 43;
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
  googleSearch = async (event) => {
    try {
      const querySearch = event._dispatchInstances.memoizedProps.children;
      const businesses = [...this.state.nearbyBusinesses];
      let city;
      for (var index = 0; index < businesses.length; index++) {
        var currentBusiness = businesses[index];
        if (currentBusiness.name === querySearch) {
          city = currentBusiness.city;
          break;
        }
      }
      // http://api.serpstack.com/search?access_key=721b444198c55793a05b62aa63af4c18&query=mcdonalds

      const searchGoogle = await axios.get(
        `http://api.serpstack.com/search?access_key=${tokens.serpApi}&query=${querySearch} ${city}`
      );
      goToUrl(searchGoogle.data.request.search_url);
    } catch (err) {
      console.log(err, "This is error from googleSearch in searchScreen.js");
    }
  };

  /*
Make it so that when a person is logged in, they can add search results to their 
favorites.

Under the hood - whenever a person opens the app, their token is renewed for another
30 days.  Check to see if presently token tells you date of creation.

*/

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
          </View>
        </View>
        <View
          style={{
            marginTop: this.evaluateListReturn(this.listResults),
          }}
        >
          {this.listResults(this.state.nearbyBusinesses)}
        </View>
      </View>
    );
  }
}
export default Search;
