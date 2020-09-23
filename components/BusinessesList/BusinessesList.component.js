import { ThemeProvider } from "@react-navigation/native";
import * as React from "react";

import {
  View,
  ScrollView,
  Text,
  ActivityIndicator,
  AsyncStorage,
} from "react-native";
import BusinessCard from "../BusinessCard/BusinessCard.component";
import { Loading } from "../Loading/Loading.component";
import LoginOverlay from "../LoginOverlay/LoginOverlay.component";
import decode from "jwt-decode";
import axios from "axios";
class BusinessesList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loginAlert: false, heart: {} };
  }
  updateAllHearts = async () => {
    const token = await AsyncStorage.getItem("userToken");
    const decoded = decode(token);
    const liked = await axios.get(
      "http://192.168.43.49:5000/api/favorites/liked"
    );
    const likedArr = liked.data;
    if (likedArr.length === 0) {
      return;
    }
    let indexes = [];
    const businessArr = [...this.props.businesses];
    for (var i = 0; i < businessArr.length; i++) {
      for (var j = 0; j < likedArr.length; j++) {
        if (businessArr[i]._id === likedArr[j]._id) {
          if (likedArr[j].liked[decoded._id] === true) {
            indexes.push(i);
          }
        }
      }
    }
    let heartUpdated = { ...this.state.heart };
    for (var i = 0; i < indexes.length; i++) {
      heartUpdated[indexes[i]] = true;
    }
    this.setState({ heart: heartUpdated });
  };

  heartFix = (id, bool) => {
    if (id === undefined && bool === undefined) {
      return;
    }
    let fixedHeart = { ...this.state.heart };
    fixedHeart[id] = bool;
    this.setState({ heart: fixedHeart });
  };
  setHeart = (i) => {
    let newHeart = { ...this.state.heart };
    if (newHeart[i] === undefined) {
      newHeart[i] = true;
      return this.setState({ heart: newHeart });
    }
    newHeart[i] = !newHeart[i];
    this.setState({ heart: newHeart });
  };
  render() {
    if (!this.props.businesses) {
      return <Loading />;
    } else if (this.props.businesses.length == 0) {
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
    } else {
      return (
        <View>
          <ScrollView
            style={{
              width: "100%",
            }}
          >
            {
              (results = this.props.businesses.map((business, id) => {
                return (
                  <BusinessCard
                    selectedTab={this.props.selectedTab}
                    key={id}
                    id={id}
                    heartFix={this.heartFix}
                    hearts={this.state.heart}
                    setIndex={this.setIndex}
                    business={business}
                    setHeart={this.setHeart}
                    setLoginAlert={this.props.setLoginAlert}
                  />
                );
              }))
            }
            {/* <LoginOverlay visible={true} />; */}
          </ScrollView>
          <LoginOverlay
            visible={this.props.loginAlert}
            removeOverlay={this.props.removeOverlayAlert}
            index={this.state.index}
            update={this.updateAllHearts}
          />
        </View>
      );
    }
  }
}
export default BusinessesList;
