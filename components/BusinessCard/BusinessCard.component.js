//Stuff to start when you return to this project:  Make sure to fix the code
//So that once you've logged in while in the business list, it updates how
//many hearts are filled in.

import * as React from "react";
import {
  View,
  Text,
  ActivityIndicator,
  AsyncStorage,
  TouchableOpacity,
} from "react-native";
import {
  Card,
  ListItem,
  Button,
  Icon,
  Image,
  Rating,
  Avatar,
  Divider,
} from "react-native-elements";
import styles from "./BusinessCard.component.style";
import axios from "axios";
import cleanAddress from "./../../services/cleanAddress";
import HoursCard from "./HoursCard.component";
import authUserLogin from "./../../services/authUserLogin";
import decode from "jwt-decode";
import { ThemeProvider } from "@react-navigation/native";

class BusinessCard extends React.Component {
  constructor(props) {
    super(props);
    // this.src = "../../assets/images/women.png";
    this.src = "../../images/blackPowerFist.jpg";
    this.state = { hours: false, heart: false };
    // if (this.props.business.photos) {
    //   var photoreference = this.props.business.photos[0].photo_reference;
    //   this.src = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoreference}&key=${token.googleApi}`;
    // }
  }
  componentDidMount = async () => {
    console.log("component did mount is doing some shit");
    const hearts = await this.findHearts();
    this.props.heartFix(this.props.id, hearts);
  };
  findHearts = async () => {
    console.log("you've entered the heart");
    const token = await AsyncStorage.getItem("userToken");

    if (token === null || token === undefined) {
      console.log("find hearts should have returned false");
      return false;
    }
    const decoded = decode(token);
    const payload = { userInfo: decoded, businessId: this.props.business._id };
    const heartExists = await axios.post(
      "http://192.168.43.49:5000/api/auth/hearts",
      payload
    );
    if (heartExists.data === false) {
      return false;
    } else {
      if (heartExists.data[decoded._id] === true) {
        return true;
      }
      return false;
    }
  };
  trimZeros = (string) => {
    let flag = false;
    let returnString = "";
    for (var i = 0; i < string.length; i++) {
      if (flag) {
        returnString += string[i];
      } else {
        if (string[i] !== "0") {
          flag = true;
          returnString += string[i];
        }
      }
    }
    return JSON.parse(returnString);
  };
  showHours = () => {
    this.setState({ hours: !this.state.hours });
  };

  openingHours = (periods) => {
    const dateToday = new Date();
    const day = dateToday.getDay();
    const timeNow =
      JSON.stringify(dateToday.getHours()) +
      JSON.stringify(dateToday.getMinutes());
    for (var i = 0; i < periods.length; i++) {
      if (periods[i].close.day === day) {
        // console.log("entering main if");
        if (periods[i].close && periods[i].open) {
          if (
            this.trimZeros(timeNow) > this.trimZeros(periods[i].close.time) ||
            this.trimZeros(timeNow) < this.trimZeros(periods[i].open.time)
          ) {
            // console.log("first if of main if");
            return false;
          } else {
            // console.log("else of main if");

            return true;
          }
        } else {
          // console.log("entered main else");
          if (period[i].close === undefined) {
            // console.log("entered if of main else");
            return true;
          }
          if (period[i].open === undefined) {
            // console.log("entered second if of main else");
            return false;
          }
        }
      }
    }
  };

  capitalizeFirstLetters = (string) => {
    let returnString = "";
    for (var i = 0; i < string.length; i++) {
      if (i === 0) {
        returnString += string[i].toUpperCase();
      } else {
        if (string[i - 1] === " ") {
          returnString += string[i].toUpperCase();
        } else {
          returnString += string[i];
        }
      }
    }
    return returnString;
  };
  showHeart = async () => {
    const presentState = { ...this.state };
    const token = await AsyncStorage.getItem("userToken");
    if (token === null) {
      return this.props.setLoginAlert(true);
    }
    const loggedIn = await authUserLogin(token);
    if (loggedIn) {
      this.addToFavs(
        token,
        this.props.hearts[this.props.id] === undefined
          ? true
          : !this.props.hearts[this.props.id]
      );
      this.props.setHeart(this.props.id);
    }
  };

  addToFavs = async (token, present) => {
    const decoded = decode(token);
    const favorited = await axios.post(
      "http://192.168.43.49:5000/api/favorites",
      {
        decoded,
        businessId: this.props.business._id,
        liked: present,
      }
    );
  };

  render() {
    return this.state.hours === false ? (
      <Card
        containerStyle={styles.cardContainer}
        wrapperStyle={styles.cardWrapper}
      >
        <Image
          source={{ uri: this.src }}
          style={styles.imageStyle}
          PlaceholderContent={<Icon name="train" color="#ffffff" />} //<ActivityIndicator />}
        />
        <View style={styles.infoContainer}>
          <Text numberOfLines={1} style={styles.title}>
            {this.props.business.name}
          </Text>
          <Divider style={{ backgroundColor: "gray" }} />
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Rating fractions={1} imageSize={25} style={styles.ratings} />
            <Avatar
              onPress={this.showHeart}
              rounded
              icon={{
                name:
                  this.props.hearts[this.props.id] === true
                    ? "favorite"
                    : "favorite-border",
              }}
            />
          </View>
          {this.props.business.opening_hours !== undefined ? (
            this.props.selectedTab === "list" ? (
              this.openingHours(this.props.business.opening_hours.periods) ? (
                <View style={styles.hours}>
                  <TouchableOpacity onPress={this.showHours}>
                    <Text style={{ color: "blue" }}>Open Now </Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <View style={styles.hours}>
                  <TouchableOpacity onPress={this.showHours}>
                    <Text style={{ color: "red" }}>Closed now </Text>
                  </TouchableOpacity>
                </View>
              )
            ) : (
              <Button
                onPress={this.showHours}
                title={
                  this.openingHours(this.props.business.opening_hours.periods)
                    ? "Open now"
                    : "Closed now"
                }
              />
            )
          ) : (
            <View style={{ ...styles.hours }}>
              <Text>Know if they're open? Add hours here...</Text>
            </View>
          )}

          <Text numberOfLines={2} style={styles.address}>
            {cleanAddress(this.props.business.lineOne)}
          </Text>
          {this.props.business.addressLn2 && (
            <Text numberOfLines={1} style={styles.address}>
              {this.props.business.addressLn2}
            </Text>
          )}
          <Text numberOfLines={1} style={styles.address}>
            {this.capitalizeFirstLetters(this.props.business.city) +
              ", " +
              this.capitalizeFirstLetters(this.props.business.state) +
              " " +
              this.props.business.zip}
          </Text>
          {/*<Button
            icon={<Icon name="code" color="#ffffff" />}
            buttonStyle={{
              borderRadius: 0,
              marginLeft: 0,
              marginRight: 0,
              marginBottom: 0,
            }}
            title="VIEW NOW"
          />
          <View
            style={{ flexDirection: "row", borderWidth: 0.4, paddingLeft: 15 }}
          >
            <Text
              onPress={this.googleSearch}
              value={this.props.business.name}
              style={{
                color: "white",
                textDecorationLine: "underline",
                lineHeight: 60,
              }}
            >
              {this.props.business.name}
            </Text>
            <Avatar
            onPress={() => {
              this.handleHeartPress(this.props.id);
              setTimeout(async () => {
                if (this.props.heartPressed[this.props.id]) {
                  const payload = {
                    ...this.props.business,
                    heartPressed: this.props.heartPressed[this.props.id],
                  };
                  await saveToFavorites(payload);
                }
              }, 1000);
            }}
            rounded
            icon={{
              name:
                this.props.heartPressed[this.props.id] === true
                  ? "favorite"
                  : "favorite-border",
            }}
          />*/}
        </View>
      </Card>
    ) : (
      <HoursCard business={this.props.business} hours={this.showHours} />
    );
  }

  handleHeartPress = (i) => {
    this.props.handleHeartPress(i);
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
    } catch (err) {}
  };
}

export default BusinessCard;
