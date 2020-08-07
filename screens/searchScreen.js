import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  BackHandler,
  StatusBar,
  Dimensions,
  ScrollView,
} from "react-native";
import axios from "axios";
import { ip } from "../services/ipService";
import tokens from "../token";
import { MaterialIcons } from "@expo/vector-icons";
import HyperLink from "./../services/urlService";
import goToUrl from "../services/goToUrl";
import { Avatar } from "react-native-elements";
import saveToFavorites from "./../services/saveToFavorites";
// import Marker from "react-native-maps";
import addLatShrugged from "./../services/addLatShrugged";
import getZipcodes from "./../services/getZipcodes";
import Map from "../components/Map";
import OverlayTest from "../components/Overlay";
import token from "../token";
import SendMail from "./../components/SendMail";

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nearbyBusinesses: null,
      markers: [],
      currentCoordinates: null,
      setOverlay: false,
      actionVisible: false,
      locationName: "",
      address: "",
      imgUri: "",
      phoneNumber: "",
      openNow: "",
    };
    this.width = Math.round(Dimensions.get("window").width);
    this.height = Math.round(Dimensions.get("window").height);
  }

  componentDidMount = () => {
    const ipCall = async () => {
      try {
        console.log("ENTERING IP CALL!!!!");
        // const placeDetails = await axios.get(
        //   "https://maps.googleapis.com/maps/api/place/details/json?place_id=ChIJB_J1KUvTD4gR0yzGC8PfxHU&key=AIzaSyAqqM6FVb05H_mzyYnGXBnekMg4SamG1ds"
        // );
        // console.log(
        //   placeDetails.data,
        //   " this is place details on line 41 of searchscreen.js"
        // );
        //   "https://api.data.gov/sam/v3/registrations?qterms=minorityOwned:OY+AND+samAddress.zip:(02139,12140)&api_key=${token.samApi}&start=1&length=1000",
        // const ipResult = await ip();
        var userLocation = await axios.get(
          `http://ip-api.com/json/65.96.175.95`
        ); //
        // will eventually load
        // `http://ip-api.com/json/${ipResult}`
        console.log("GETTING PAST THE LOCATION");

        const userCoordinates = {
          latitude: userLocation.data.lat,
          longitude: userLocation.data.lon,
        };
        const currentZipcode = userLocation.data.zip;

        const zipCodes = await getZipcodes(currentZipcode, 2);
        const zipString = this.getZipString(zipCodes.zip_codes);
        const businesses = await axios.get(
          `https://api.data.gov/sam/v3/registrations?qterms=samAddress.zip:${zipString}+AND+minorityOwned:true&OY&api_key=${tokens.samApi}&start=1&length=1000`
        );
        const groomedArray = this.usefulInfo(businesses.data.results);

        this.setState({
          currentCoordinates: userCoordinates,
          nearbyBusinesses: groomedArray,
        });

        const markers = await addLatShrugged(groomedArray, userCoordinates);
        this.setState({ markers: markers });
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

  getZipString = (zipCodeArray) => {
    var zipString = "(";
    for (var index = zipCodeArray.length - 1; index > 0; index--) {
      zipString += zipCodeArray[index].zip_code;
      if (index > 1) {
        zipString += ",";
      }
    }
    zipString += ")";
    return zipString;
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
        address: element.samAddress.line1,
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
  handleActionButton = () => {
    this.setState({ actionVisible: true, setOverlay: false });
  };
  handleSetOverlay = async (marker) => {
    const placeDetails = await axios.get(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${marker.place_id}&key=${token.googleApi}`
    );
    console.log(placeDetails.data.result.opening_hours, "MARKER ENDS");
    this.setState({
      setOverlay: true,
      locationName: marker.name,
      address: marker.address,
      imgUri: placeDetails.data.result.icon,
      phoneNumber: placeDetails.data.result.formatted_phone_number,
      openNow:
        placeDetails.data.result.opening_hours !== undefined
          ? placeDetails.data.result.opening_hours
          : "",
    });
  };
  handleNotVisible = () => {
    this.setState({ actionVisible: false });
  };
  removeOverlay = () => {
    this.setState({ setOverlay: false });
  };

  render() {
    // console.log(this.state.markers, "this is state.markers from searchScreen");
    return (
      <View
        style={{
          paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
          backgroundColor: "#fc5c65",
          // justifyContent: "center",
          flexDirection: "column",
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
            backgroundColor: "white",
            width: "100%",
            borderRadius: 30,
            padding: 10,
            alignContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ marginBottom: 10, fontWeight: "bold", fontSize: 40 }}>
            Get bizzed!
          </Text>

          <View>
            <Text style={{ fontSize: 28 }}>👨🏾‍🦲👩🏾‍🦰👩🏿‍🦱👵🏾🧑🏾‍🧓🏾👴🏾👨🏾‍🦱👱🏾👩🏾‍🦲</Text>
            <Text style={{ padding: 2.5, fontSize: 16, fontWeight: "600" }}>
              Below is a list of black-owned businesses near you!
            </Text>
          </View>
        </View>

        <View
          style={{
            width: "100%",
            height: "50%",
          }}
        >
          {this.state.currentCoordinates && (
            <Map
              setOverlay={this.handleSetOverlay}
              markers={this.state.markers}
              currentCoordinates={this.state.currentCoordinates}
            />
          )}
        </View>
        <OverlayTest
          address={this.state.address}
          locationName={this.state.locationName}
          removeOverlay={this.removeOverlay}
          visible={this.state.setOverlay}
          style={{ marginTop: 200 }}
          imgUri={this.state.imgUri}
          phoneNumber={this.state.phoneNumber}
          openNow={this.state.openNow}
          handleActionButton={this.handleActionButton}
        />
        <SendMail
          address={"This approach works"}
          locationName={this.state.locationName}
          removeOverlay={this.removeOverlay}
          visible={this.state.actionVisible}
          notVisible={this.handleNotVisible}
          style={{ marginTop: 200 }}
          imgUri={this.state.imgUri}
          phoneNumber={this.state.phoneNumber}
          openNow={this.state.openNow}
          handleActionButton={this.handleActionButton}
        />

        <ScrollView
          style={{
            marginTop: this.evaluateListReturn(this.listResults),
            width: "100%",
          }}
        >
          {this.listResults(this.state.nearbyBusinesses)}
        </ScrollView>
      </View>
    );
  }
}
export default Search;
