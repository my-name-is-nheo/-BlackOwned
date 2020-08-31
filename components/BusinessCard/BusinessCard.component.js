import * as React from "react";
import { View, Text, ActivityIndicator } from "react-native";
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
import token from "../../token";

class BusinessCard extends React.Component {
  constructor(props) {
    super(props);
    this.src = "../../assets/images/women.png";
    if (this.props.business.photos) {
      var photoreference = this.props.business.photos[0].photo_reference;
      this.src = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoreference}&key=${token.googleApi}`;
    }
  }

  render() {
    return (
      <Card
        containerStyle={styles.cardContainer}
        wrapperStyle={styles.cardWrapper}
        //  title={this.props.business.name}
      >
        <Image
          source={{ uri: this.src }}
          style={styles.imageStyle}
          PlaceholderContent={<Icon name="user" color="#ffffff" />} //<ActivityIndicator />}
        />
        <View style={styles.infoContainer}>
          <Text numberOfLines={1} style={styles.title}>
            {this.props.business.name}
          </Text>
          <Divider style={{ backgroundColor: "gray" }} />

          <Rating fractions={1} imageSize={25} style={styles.ratings} />

          <Text numberOfLines={1} style={styles.address}>
            {this.props.business.addressLn1}
          </Text>
          {this.props.business.addressLn2 && (
            <Text numberOfLines={1} style={styles.address}>
              {this.props.business.addressLn2}
            </Text>
          )}
          <Text numberOfLines={1} style={styles.address}>
            {this.props.business.city +
              ", " +
              this.props.business.state +
              " " +
              this.props.business.zipcode}
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

export default BusinessCard;
