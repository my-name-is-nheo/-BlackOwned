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
  mapFavorites = (arr) => {
    return arr.map((item, i) => {
      return (
        <View
          key={i}
          style={{
            padding: 0,
            justifyContent: "center",
            alignItems: "center",
            alignContent: "center",
            marginBottom: 10,
            borderRadius: 20,
            height: this.height / 5,
            marginRight: this.width / 19,
            marginLeft: this.width / 19,
            width: (this.width / 19) * 18,
            backgroundColor: "green",
            flexDirection: "row",
          }}
        >
          <View style={{ width: "50%", backgroundColor: "pink" }}>
            <Avatar rounded icon={{ name: "restaurant" }} size="large" />
          </View>
          <View
            style={{
              backgroundColor: "grey",
              width: "50%",
              flexDirection: "column",
            }}
          >
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={{ fontSize: 15 }}>{item.name}</Text>
              <Avatar
                onPress={() => {
                  this.handleHeartPress(i);
                }}
                rounded
                size="medium"
                icon={{ name: "favorite" }}
              />
            </View>
            <Text>{item.rating}</Text>
          </View>
        </View>
      );
    });
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

  removeItemValue = async (key) => {
    try {
      await AsyncStorage.removeItem(key);
      return true;
    } catch (exception) {
      return false;
    }
  };

  completeDb = async () => {
    try {
      const postId = await AsyncStorage.getItem("candidatesUpdated");

      if (postId !== null) {
        const detailsArray = JSON.parse(postId);
        console.log(detailsArray[0], "deebeedoo");
        // let foundOption = 0;
        // console.log(parsedOptions[0], "parsedOptions");
        // const original = await AsyncStorage.getItem("mockDb");
        // const originalParsed = JSON.parse(original);
        // // console.log(originalParsed[0], "Original");
        // const keySearch = {};

        // for (var i = 0; i < originalParsed.length; i++) {
        //   for (var j = 0; j < parsedOptions.length; j++) {
        //     if (parsedOptions[j].id === originalParsed[i].linkingId) {

        //     }
        //   }
        // }
        // console.log(foundOption, "found option");
        return;
      }
      const check = await AsyncStorage.getItem("candidates");

      if (check !== null) {
        console.log("going first to check not null");
        const parsedOptions = JSON.parse(check);
        // const testOfAddress = await axios.get(
        //   "https://maps.googleapis.com/maps/api/place/details/json?key=AIzaSyAjYsf3pJw7TsxvBBs6FFJ8veUkLdF6zl0&place_id=ChIJndjaoigeVIgRnBNKZ7Vh6-U&fields=address_component,adr_address,business_status,formatted_address,geometry,icon,name,permanently_closed,photo,place_id,plus_code,type,url,formatted_phone_number,international_phone_number,opening_hours,website,price_level,rating,review,user_ratings_total"
        // );
        // console.log(testOfAddress);
        const mappedWithId = parsedOptions.map(async (item) => {
          const placeId = item.place_id;
          const endpoint = `https://maps.googleapis.com/maps/api/place/details/json?key=AIzaSyAjYsf3pJw7TsxvBBs6FFJ8veUkLdF6zl0&place_id=${placeId}&fields=address_component,adr_address,business_status,formatted_address,geometry,icon,name,permanently_closed,photo,place_id,plus_code,type,url,formatted_phone_number,international_phone_number,opening_hours,website,price_level,rating,review,user_ratings_total`;
          const promiseReturned = await axios.get(endpoint);
          const clonedPromiseReturn = { ...promiseReturned };
          clonedPromiseReturn.linkingId = item.id;
          return clonedPromiseReturn;
        });

        Promise.all(mappedWithId).then(async (promises) => {
          const objWithGoogle = [];
          for (var i = 0; i < promises.length; i++) {
            if (promises[i].data.result) {
              const pushedObj = { ...promises[i].data.result };
              pushedObj.id = promises[i].linkingId;
              objWithGoogle.push(pushedObj);
            }
          }
          const strungObj = JSON.stringify(objWithGoogle);
          await AsyncStorage.setItem("candidatesUpdated", strungObj);
        });
        return;
      }
      let idArray = [];
      const key = "AIzaSyAjYsf3pJw7TsxvBBs6FFJ8veUkLdF6zl0";
      const dbData = await AsyncStorage.getItem("mockDb");
      const dataParsed = JSON.parse(dbData);
      const mappedPromises = dataParsed.map(async (item) => {
        const encodedName = encodeURIComponent(
          item.name.toLowerCase() + "" + item.city.toLowerCase()
        );
        const testData = await axios.get(
          `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${encodedName}&inputtype=textquery&fields=place_id,business_status,photos,formatted_address,name,rating,user_ratings_total,opening_hours,geometry&key=AIzaSyAjYsf3pJw7TsxvBBs6FFJ8veUkLdF6zl0`
        );

        const clonedDataObj = { ...testData };
        clonedDataObj.linkingId = item.linkingId;
        return clonedDataObj;
      });

      Promise.all(mappedPromises).then(async (promises) => {
        const objWithGoogle = [];
        for (var i = 0; i < promises.length; i++) {
          if (promises[i].data.candidates.length !== 0) {
            const pushedObj = { ...promises[i].data.candidates[0] };
            pushedObj.id = promises[i].linkingId;
            objWithGoogle.push(pushedObj);
          }
        }
        const strungObj = JSON.stringify(objWithGoogle);
        await AsyncStorage.setItem("candidates", strungObj);
      });
    } catch (error) {
      console.log(error, "This is the error");
    }
  };
  mockDb = async (input) => {
    const reStrung = JSON.stringify(input);
    await AsyncStorage.setItem("mockDb", reStrung);
  };
  handleApi = async () => {
    try {
      const dbData = await AsyncStorage.getItem("callData");
      if (dbData) {
        const parsedDb = JSON.parse(dbData);
        const arrayToFireOff = parsedDb.map((item) => {
          let finalObj = {};
          finalObj.name = item.legalBusinessName;
          finalObj.city = item.samAddress.city.toLowerCase();
          finalObj.hasVerified = false;
          finalObj.linkingId = this.numberGen();

          return finalObj;
        });
        await this.mockDb(arrayToFireOff);

        for (var i = 0; i < arrayToFireOff.length; i++) {
          let { name, hasVerified, linkingId } = arrayToFireOff[i];
          let fixedObj = { name, hasVerified, linkingId };
          axios.post("http://192.168.43.49:5000/api/users/testModel", fixedObj);
        }

        return;
      }
      const allData = await axios.get(
        "https://api.data.gov/sam/v3/registrations?qterms=minorityOwned:true&OY&api_key=9ixRFemUBpKWnTmmciB6SQ4ecGJwGeLZiqlh2XR7&start=1&length=1000"
      );
      await AsyncStorage.setItem(
        "callData",
        JSON.stringify(allData.data.results)
      );
      await AsyncStorage.setItem("mockDb", "[]");
    } catch (error) {}
  };
  clearAsync = async () => {
    await AsyncStorage.clear();
    await this.removeItemValue("candidates");
  };
  numberGen = () => {
    const numPart1 = Date.now();
    const stringPart1 = JSON.stringify(numPart1);
    const randomNumber = JSON.stringify(Math.random() * 10000000);
    const finalNum = stringPart1 + randomNumber;
    return finalNum;
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
        <Button onPress={this.handleApi} title={"Fill DB"} />
        <Button onPress={this.completeDb} title={"Complete the DB"} />
        <Button onPress={this.clearAsync} title={"Clear Async Storage"} />
        <Button onPress={this.numberGen} title={"Create a serial number"} />
        <Text>When da button get a pressed, da Db a getta filled...</Text>
      </View>
    );
  }
}
export default FillDb;

//07/01/2020 - need to set up backend to return ip, create fucking backhandler for every thing
