import * as React from "react";
import { View, Text, ActivityIndicator, TouchableOpacity } from "react-native";
import {
  Card,
  ListItem,
  Button,
  Icon,
  Image,
  Rating,
  Divider,
} from "react-native-elements";
import styles from "./BusinessCard.component.style";
import axios from "axios";
import cleanAddress from "./../../services/cleanAddress";
class HoursCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { height: 0 };
    // this.src = "../../assets/images/women.png";
    this.src = "../../images/blackPowerFist.jpg";
  }

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
  closeHours = () => {
    this.props.hours();
  };
  render() {
    if (this.props.business.name.includes("Satkaa")) {
      console.log(this.props.business.opening_hours.weekday_text);
    }
    return (
      <Card
        containerStyle={styles.cardContainer}
        wrapperStyle={styles.cardWrapper}
      >
        <Image
          source={{ uri: this.src }}
          style={{ ...styles.imageStyleHours, height: this.state.height }}
          PlaceholderContent={<Icon name="train" color="#ffffff" />} //<ActivityIndicator />}
        />
        <View
          onLayout={(event) => {
            var { x, y, width, height } = event.nativeEvent.layout;
            this.setState({ height: height });
          }}
          style={styles.infoContainerHours}
        >
          <Text numberOfLines={1} style={styles.title}>
            {this.props.business.name}
          </Text>
          <Divider style={{ backgroundColor: "gray" }} />

          <Rating fractions={1} imageSize={25} style={styles.ratings} />

          <View style={{ marginBottom: 5 }}>
            <TouchableOpacity onPress={this.closeHours}>
              {this.openingHours(this.props.business.opening_hours.periods) ? (
                <Text style={{ color: "blue" }}>Open Now</Text>
              ) : (
                <Text style={{ color: "red" }}>Closed Now</Text>
              )}
            </TouchableOpacity>
          </View>

          <Text numberOfLines={1} style={styles.address}>
            {this.props.business.opening_hours.weekday_text[0]}
          </Text>
          <Text numberOfLines={1} style={styles.address}>
            {this.props.business.opening_hours.weekday_text[1]}
          </Text>
          <Text numberOfLines={1} style={styles.address}>
            {this.props.business.opening_hours.weekday_text[2]}
          </Text>
          <Text numberOfLines={1} style={styles.address}>
            {this.props.business.opening_hours.weekday_text[3]}
          </Text>
          <Text numberOfLines={1} style={styles.address}>
            {this.props.business.opening_hours.weekday_text[4]}
          </Text>
          <Text numberOfLines={1} style={styles.address}>
            {this.props.business.opening_hours.weekday_text[5]}
          </Text>
          <Text numberOfLines={1} style={styles.address}>
            {this.props.business.opening_hours.weekday_text[6]}
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

export default HoursCard;
