import React, { useState, useEffect } from "react";
import { Button, Avatar } from "react-native-elements";
import {
  View,
  Text,
  BackHandler,
  Dimensions,
  AsyncStorage,
} from "react-native";
import axios from "axios";

// import Icon from "react-native-vector-icons/MaterialIcons";

//Instructions:
//Click FillDb once, count to ten, and then click it again and count to ten again.
//Then click complete the DB and count to ten.  Follow that up by clicking reconcile differences and then counting to ten.
//Then click complete the DB again and count to ten.  Finally, click complete the DB one last time and count to ten.  Then click on send to backend.

class FillDb extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      favorite: null,
    };
    this.width = Math.round(Dimensions.get("window").width);
    this.height = Math.round(Dimensions.get("window").height);
  }

  componentDidMount = () => {
    console.log(this.props.backValue, " This is the backvalue");

    if (!this.props.backValue) {
      this.props.updateHistory(this.props.history.location.pathname);
    }

    BackHandler.addEventListener("hardwareBackPress", this.backOne);
  };
  componentWillUnmount = () => {
    BackHandler.removeEventListener("hardwareBackPress", this.backOne);
  };

  zipLength = async () => {
    const original = await AsyncStorage.getItem("arrMeDatey");
    const originalParsed = JSON.parse(original);
    let zips = [];
    for (var i = 0; i < originalParsed.length; i++) {
      if (
        originalParsed[i].samAddress.zip !== undefined &&
        originalParsed[i].samAddress.zip.length !== 5
      ) {
        zips.push(originalParsed[i]);
      }
    }

    console.log(zips);
  };
  addZips = async () => {
    // const backend = await axios.get(
    //   `http://192.168.43.49:5000/api/users/db/localBusinesses`
    // );
    // const fullDb = JSON.stringify(backend.data);
    // await AsyncStorage.setItem("mongoDb", fullDb);
    // console.log("we set the back");
    // return;

    const meDatey = await AsyncStorage.getItem("arrMeDatey");
    const mongoDb = await AsyncStorage.getItem("mongoDb");
    if (meDatey !== null && mongoDb !== null) {
      const dateyParsed = JSON.parse(meDatey);
      const mongoParsed = JSON.parse(mongoDb);
      let directory = {};
      for (var i = 0; i < mongoParsed.length; i++) {
        if (directory[mongoParsed[i].name] === undefined) {
          directory[mongoParsed[i].name] = i;
        }
      }

      for (var j = 0; j < dateyParsed.length; j++) {
        if (dateyParsed[j].samAddress.zip) {
          if (directory[dateyParsed[j].legalBusinessName] !== undefined) {
            mongoParsed[directory[dateyParsed[j].legalBusinessName]].zip =
              dateyParsed[j].samAddress.zip;
          }
        }
      }
      for (var i = 0; i < mongoParsed.length; i++) {
        if (mongoParsed[i].zip !== undefined) {
          const zip = mongoParsed[i].zip;
          const id = mongoParsed[i]._id;
          await axios.post(
            `http://192.168.43.49:5000/api/users/db/localBusinesses/correctZip`,
            { zip, id }
          );
        }
      }
      console.log("FINIT");
      return;
    }

    const originalData = await axios.get(
      "https://api.data.gov/sam/v3/registrations?qterms=minorityOwned:true&OY&api_key=9ixRFemUBpKWnTmmciB6SQ4ecGJwGeLZiqlh2XR7&start=1&length=1000"
    );
    const dataArr = JSON.stringify(originalData.data.results);
    await AsyncStorage.setItem("arrMeDatey", dataArr);
  };
  correctBackend = async () => {
    const currentDb = await axios.get(
      `http://192.168.43.49:5000/api/users/db/localBusinesses`
    );
    const backEnd = currentDb.data;
    const origData = await AsyncStorage.getItem("arrMeDatey");
    const origDataParsed = JSON.parse(origData);

    // let output = [];
    for (var i = 0; i < backEnd.length; i++) {
      for (var j = 0; j < origDataParsed.length; j++) {
        if (backEnd[i].name === origDataParsed[j].legalBusinessName) {
          const updateObject = {
            ...origDataParsed[j].samAddress,
            linkingId: backEnd[i].linkingId,
          };
          await axios.post(
            `http://192.168.43.49:5000/api/users/db/localBusinesses/addresses`,
            updateObject
          );
        }
      }
    }
  };

  clearLiked = async () => {
    const currentDb = await axios.get(
      `http://192.168.43.49:5000/api/users/db/localBusinesses`
    );
    for (var i = 0; i < currentDb.data.length; i++) {
      if (currentDb.data[i].liked) {
        console.log("It didn't work!");
        const found = { ...currentDb.data[i] };
        await axios.post(`http://192.168.43.49:5000/api/auth/cleanse`, found);
      }
    }
    console.log("loop ran, found no instances");
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
        {/* <Button onPress={this.addZips} title="Add zip codes" />
        <Button onPress={this.zipLength} title="See zips" />
        <Button onPress={this.correctBackend} title="Final Address Fix" /> */}
        <Button onPress={this.clearLiked} title="Clear liked" />
        <Text>When da button get a pressed, da Db a getta filled...</Text>
      </View>
    );
  }
}
export default FillDb;

//07/01/2020 - need to set up backend to return ip, create fucking backhandler for every thing
