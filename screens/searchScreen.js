import React, { useState, useEffect } from "react";
import { ipService } from "../services/ipService";
import {
  View,
  Text,
  SafeAreaView,
  BackHandler,
  Button,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import { ip } from "../services/ipService";
import businessSearch from "../services/businessSearch";
import tokens from "../token";

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ipState: null, ipCity: null, businesses: null };
  }

  componentDidMount = () => {
    const ipCall = async () => {
      try {
        console.log("CDM is running");
        const ipResult = await ip();
        console.log(ipResult, typeof ipResult, "IPRESULT AND TYPE");
        var userLocation = await axios.get(
          `http://ip-api.com/json/74.96.248.200`
        );
        const city = userLocation.data.city;
        const businesses = await axios.get(tokens.samApi);
        const groomedArray = this.usefulInfo(businesses.data.results);

        this.setState({
          ipCity: city,
          ipState: ipResult,
          businesses: groomedArray,
        });
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
  test = (e) => {
    console.log(e.target.value, "is there a value");
  };

  render() {
    return (
      <View
        style={{
          top: 200,
          flex: 1,
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
          height: 100,
          width: 100,
        }}
      >
        <Text>Welcome to Search Page</Text>
        <TouchableOpacity
          style={{ flex: 1, alignContent: "center" }}
          onPress={this.test}
        >
          <View>
            <Text>Search me</Text>
          </View>
        </TouchableOpacity>
        <View title="search me" value={3} onPress={this.test}></View>
      </View>
    );
  }
}
export default Search;
