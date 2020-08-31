import React, { useState, useEffect } from "react";
import { ipService } from "../../services/ipService";
import {
  View,
  Text,
  SafeAreaView,
  BackHandler,
  StatusBar,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import TabNavigator from "react-native-tab-navigator";
import axios from "axios";
import { ip } from "../../services/ipService";
import tokens from "../../token";
import getZipcodes from "../../services/getZipcodes";
import BusinessesList from "../../components/BusinessesList/BusinessesList.component";
import Map from "../../components/Map/Map.component";
import getGoogleBusinessesData from "../../services/getGoogleBusinessesData";
import TopHeader from "../../components/TopHeader/TopHeader.component";
import styles from "./SearchScreen.style";
import FavoriteScreen from "../favoriteScreen";
import OverlayTest from "../../components/Overlay";
import SendMail from "../../components/SendMail";
import { Container } from "native-base";

const deviceW = Dimensions.get("window").width;

const basePx = 375;

function px2dp(px) {
  return (px * deviceW) / basePx;
}

class SearchScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nearbyBusinesses: null,
      currentCoordinates: null,
      selectedTab: "map",
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

  changeTab = (selectedTab) => {
    this.setState({ selectedTab });
  };

  centerMapForUserLocation = () => {
    /*
    problem facing here.
    1. geolocator is very accurate. you have to enable location on expo cli as well and will update to your location. (defaults to sanfrancisco if you don't)
    2. state is updated with user's coordinates as shown in line 63
    3. checked to make sure when the coordinates enter addLatShrugged on line 103-16, but we're sending in the default location to addLatShrugged
    - fixed problem 3. android emulator has no way of locating the virtual machine. so I had to set the location to my current location in settings.
    - works great on the emulator. standard blue dot will appear representing the mock location. coordinates matches the one's I manually set.
    - phone test - the coordinates of the phone vs coordinates of the emulator are slightly different meaning the app is locating the device correctly.
    - phone location is displayed correctly. however, i do not know if it's because I'm using an ios, but addLatShrugged is not reached - showing no list of businesses or markers on the map.
    - marker.address. match the currentLocation zipcode which is set to Vienna,VA
    - tried setting location to texas. location is accurately presented. markers are not displayed, some businesses from texas are displayed with addition to Vienna,VA..coordinates entering addLatShrugged are correct.
    update after 10-15 minutes
    - markers and list of buinesses eventually showed up on the phone.
    emulator 7-9secbusinesses show up, 13 sec markers showed up
    phone (ios) businesses show up,  markers showed up, they'll show up eventually.
    */

    navigator.geolocation.getCurrentPosition(
      (position) => {
        //   console.log(position, "this is position");
        var userCurrentLocation = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        // console.log(userCurrentLocation, " this is user's currentlocation"); //<==== works fine
        this.setState({ currentCoordinates: userCurrentLocation });
      },
      (error) => {
        //    console.log("navigator.geolocation ain't working");
      },
      {
        enableHighAccuracy: true,
        maximumAge: 60000,
        timeout: 2000,
      }
    );
  };

  componentDidMount = () => {
    this.centerMapForUserLocation();

    const ipCall = async () => {
      try {
        const ipResult = await ip();
        var userLocation = await axios.get(
          `http://ip-api.com/json/${ipResult}`
        );
        const userCoordinates = {
          latitude: this.state.currentCoordinates.latitude,
          longitude: this.state.currentCoordinates.longitude,
        };
        const currentZipcode = userLocation.data.zip;

        const zipCodes = await getZipcodes(currentZipcode, 2);
        const zipString =
          "(" + zipCodes.zip_codes.map((z) => z.zip_code).join() + ")";
        const businesses = await axios.get(
          `https://api.data.gov/sam/v3/registrations?qterms=samAddress.zip:${zipString}+AND+minorityOwned:true&OY&api_key=${tokens.samApi}&start=1&length=1000`
        );
        const groomedArray = this.usefulInfo(businesses.data.results);

        const googleBusinessPromises = await getGoogleBusinessesData(
          groomedArray,
          userCoordinates
        );
        console.log("priminses", googleBusinessPromises);
        Promise.all(googleBusinessPromises).then((businesses) => {
          console.log("buisnesses", businesses);
          this.setState({
            nearbyBusinesses: businesses,
          });
        });
      } catch (error) {
        console.log(error, "componentDidMount error on SearchScreen.js");
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
  listResults = (input) => {};

  usefulInfo = (arr) => {
    // console.log("input", arr);
    const mapInfo = arr.map((element) => {
      let infoObj = {
        name: element.legalBusinessName,
        addressLn1: element.samAddress.line1,
        addressLn2: element.samAddress.line2,
        city: element.samAddress.city,
        state: element.samAddress.stateOrProvince,
        zipcode: element.samAddress.zip,
      };

      return infoObj;
    });
    return mapInfo;
  };

  /*
Make it so that when a person is logged in, they can add search results to their 
favorites.

Under the hood - whenever a person opens the app, their token is renewed for another
30 days.  Check to see if presently token tells you date of creation.

*/
  handleActionButton = () => {
    this.setState({ actionVisible: true, setOverlay: false });
  };
  handleSetOverlay = async (business) => {
    const placeDetails = await axios.get(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${business.place_id}&key=${tokens.googleApi}`
    );
    //console.log(placeDetails.data.result.opening_hours, "MARKER ENDS");
    this.setState({
      setOverlay: true,
      locationName: business.name,
      address: business.address,
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
    return (
      <View style={styles.searchContainer}>
        <TopHeader />
        <TabNavigator tabBarStyle={{}} sceneStyle={{}}>
          <TabNavigator.Item
            selected={this.state.selectedTab === "addBusiness"}
            selectedTitleStyle={{ color: "#3496f0" }}
            renderIcon={() => (
              <Icon name="plus-circle" size={px2dp(22)} color="#666" />
            )}
            renderSelectedIcon={() => (
              <Icon name="plus-circle" size={px2dp(22)} color="#3496f0" />
            )}
            //badgeText="1"
            onPress={() => this.setState({ selectedTab: "addBusiness" })}
          >
            <Text>{"Add Business screen goes here"}</Text>
          </TabNavigator.Item>
          <TabNavigator.Item
            selected={this.state.selectedTab === "favorites"}
            selectedTitleStyle={{ color: "#3496f0" }}
            renderIcon={() => (
              <Icon name="heart" size={px2dp(22)} color="#666" />
            )}
            renderSelectedIcon={() => (
              <Icon name="heart" size={px2dp(22)} color="#3496f0" />
            )}
            //badgeText="1"
            onPress={() => this.setState({ selectedTab: "favorites" })}
          >
            <Text>{FavoriteScreen}</Text>
          </TabNavigator.Item>

          <TabNavigator.Item
            renderIcon={() => (
              <MaterialIcon name="my-location" size={px2dp(22)} color="#666" />
            )}
            onPress={() => {
              this.setState({ selectedTab: "map" });
              this.centerMapForUserLocation();
            }}
          >
            <Map
              setOverlay={this.handleSetOverlay}
              businesses={this.state.nearbyBusinesses}
              currentCoordinates={this.state.currentCoordinates}
            />
          </TabNavigator.Item>
          <TabNavigator.Item
            selected={this.state.selectedTab === "map"}
            selectedTitleStyle={{ color: "#3496f0" }}
            renderIcon={() => <Icon name="map" size={px2dp(22)} color="#666" />}
            renderSelectedIcon={() => (
              <Icon name="map" size={px2dp(22)} color="#3496f0" />
            )}
            //badgeText="1"
            onPress={() => this.setState({ selectedTab: "map" })}
          >
            <Map
              setOverlay={this.handleSetOverlay}
              businesses={this.state.nearbyBusinesses}
              currentCoordinates={this.state.currentCoordinates}
            />
          </TabNavigator.Item>
          <TabNavigator.Item
            selected={this.state.selectedTab === "list"}
            selectedTitleStyle={{ color: "#3496f0" }}
            renderIcon={() => (
              <Icon name="th-list" size={px2dp(22)} color="#666" />
            )}
            renderSelectedIcon={() => (
              <Icon name="th-list" size={px2dp(22)} color="#3496f0" />
            )}
            onPress={() => this.setState({ selectedTab: "list" })}
          >
            <BusinessesList businesses={this.state.nearbyBusinesses} />
          </TabNavigator.Item>
        </TabNavigator>
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
        {/*  <SendMail
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
        /> */}
      </View>
    );
  }
}
export default SearchScreen;
