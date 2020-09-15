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

  sendToDb = async () => {
    const savedModel = await AsyncStorage.getItem("savedModel");
    const finalSavedDb = await AsyncStorage.getItem("finalSavedDb");
    const savedModelParsed = JSON.parse(savedModel);
    const finalSavedDbParsed = JSON.parse(finalSavedDb);
    for (var i = 0; i < finalSavedDbParsed.length; i++) {
      await axios.post(
        "http://192.168.1.216:5000/api/users/testModel",
        finalSavedDbParsed[i]
      );
    }
  };
  completeDb = async () => {
    try {
      const postId = await AsyncStorage.getItem("candidatesUpdated");

      if (postId !== null) {
        console.log("entered into the last one, homie");

        const detailsArray = JSON.parse(postId);
        // console.log(detailsArray[14], "deebeedoo");
        const originalEntry = await AsyncStorage.getItem("mockDb");
        const parsedOriginal = JSON.parse(originalEntry);
        // console.log(parsedOriginal[0], "This is your original");
        const infoKeys = [
          "international_phone_number",
          "types",
          "website",
          "rating",
          "reviews",
          "photos",
          "opening_hours",
          "geometry",
          "formatted_address",
          "formatted_phone_number",
          "address_components",
        ];
        let arrayReturned = [];
        for (var i = 0; i < parsedOriginal.length; i++) {
          let acceptedFlag = false;
          for (var j = 0; j < detailsArray.length; j++) {
            if (parsedOriginal[i].linkingId === detailsArray[j].id) {
              acceptedFlag = true;
              let newObj = { ...parsedOriginal[i] };
              for (var k = 0; k < infoKeys.length; k++) {
                if (detailsArray[j][infoKeys[k]] !== undefined) {
                  newObj[infoKeys[k]] = detailsArray[j][infoKeys[k]];
                }
              }
              arrayReturned.push(newObj);
            }
          }
          if (acceptedFlag === false) {
            const copyPushed = { ...parsedOriginal[i] };
            arrayReturned.push(copyPushed);
          }
        }
        // let cityArray = [];
        // for (var y = 0; y < arrayReturned.length; y++) {
        //   if (arrayReturned[y].formatted_address !== undefined) {
        //     let obj = {};
        //     obj.address = arrayReturned[y].formatted_address;
        //     obj.index = y;
        //     cityArray.push(obj);
        //   }
        // }
        let thiccArray = [];
        for (var i = 0; i < arrayReturned.length; i++) {
          if (Object.keys(arrayReturned[i]).length > 5) {
            thiccArray.push(arrayReturned[i]);
          }
        }
        let finalObj = {};
        for (var i = 0; i < thiccArray.length; i++) {
          for (var butt in thiccArray[i]) {
            if (!infoKeys.includes(butt)) {
              finalObj[butt] = true;
            }
          }
        }

        let objWithTypes = {};
        let errors = 0;
        for (var i = 0; i < arrayReturned.length; i++) {
          for (var keyType in arrayReturned[i]) {
            if (objWithTypes[keyType] === undefined) {
              objWithTypes[keyType] = typeof arrayReturned[i][keyType];
            } else {
              if (objWithTypes[keyType] !== typeof arrayReturned[i][keyType]) {
                console.log(
                  typeof objWithTypes[keyType],
                  " versus ",
                  typeof arrayReturned[i][keyType]
                );
                errors += 1;
              }
            }
          }
        }
        const savedModel = JSON.stringify(objWithTypes);
        const finalSavedDb = JSON.stringify(arrayReturned);
        await AsyncStorage.setItem("savedModel", savedModel);
        await AsyncStorage.setItem("finalSavedDb", finalSavedDb);
        console.log("finished saving db");
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
      console.log("this is where you get to after the first surge");
      let idArray = [];
      const key = "AIzaSyAjYsf3pJw7TsxvBBs6FFJ8veUkLdF6zl0";
      const dbData = await AsyncStorage.getItem("mockDb");

      const dataParsed = JSON.parse(dbData);
      console.log(dataParsed.length, "DP length");
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
        const repairArray = [];
        for (var i = 0; i < promises.length; i++) {
          if (promises[i].data.candidates.length !== 0) {
            if (promises[i].data.candidates.length > 1) {
              // console.log(promises[i].data.candidates.length, "index: ", i);
              const repairObject = {
                data: promises[i].data,
                index: i,
                linkingId: promises[i].linkingId,
              };
              repairArray.push(repairObject);
            }

            if (
              !promises[i].data.candidates[0].formatted_address.includes(
                "United States"
              )
            ) {
              const fixedObj = {
                data: promises[i].data,
                index: i,
                linkingId: promises[i].linkingId,
              };
              repairArray.push(fixedObj);
            }

            const pushedObj = { ...promises[i].data.candidates[0] };
            pushedObj.id = promises[i].linkingId;
            objWithGoogle.push(pushedObj);
          }
        }
        const strungObj = JSON.stringify(objWithGoogle);
        await AsyncStorage.setItem("candidates", strungObj);
        const strungRepair = JSON.stringify(repairArray);
        await AsyncStorage.setItem("repair", strungRepair);
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
          finalObj.state = item.samAddress.stateOrProvince;
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
          axios.post("http://192.168.1.216:5000/api/users/testModel", fixedObj);
        }

        return;
      }
      const allData = await axios.get(
        "https://api.data.gov/sam/v3/registrations?qterms=minorityOwned:true&OY&api_key=9ixRFemUBpKWnTmmciB6SQ4ecGJwGeLZiqlh2XR7&start=1&length=1000"
      );
      console.log("cleared SAMS call");
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
    console.log(
      "CLEARED -------------------------------------------------------------------------------------------"
    );
  };
  numberGen = () => {
    const numPart1 = Date.now();
    const stringPart1 = JSON.stringify(numPart1);
    const randomNumber = JSON.stringify(Math.random() * 10000000);
    const finalNum = stringPart1 + randomNumber;
    return finalNum;
  };

  reconcile = async () => {
    const reconcile = await AsyncStorage.getItem("repair");
    const reconcileParsed = JSON.parse(reconcile);
    //original length is 26
    const originals = await AsyncStorage.getItem("mockDb");
    const preOrigParsed = JSON.parse(originals);
    const origParsed = [];
    const candidates = await AsyncStorage.getItem("candidates");
    const parsedCandidates = JSON.parse(candidates);
    const withCorrectState = [];

    for (var i = 0; i < preOrigParsed.length; i++) {
      if (preOrigParsed[i].state && preOrigParsed[i].state.length === 2) {
        origParsed.push(preOrigParsed[i]);
      }
    }

    for (var i = 0; i < origParsed.length; i++) {
      for (var j = 0; j < parsedCandidates.length; j++) {
        if (origParsed[i].linkingId === parsedCandidates[j].id) {
          const addingCorrectState = { ...parsedCandidates[j] };
          addingCorrectState.correctState = origParsed[i].state;
          for (var key in addingCorrectState) {
            if (key === "id") {
              delete addingCorrectState[key];
            }
          }
          addingCorrectState.linkingId = origParsed[i].linkingId;
          withCorrectState.push(addingCorrectState);
        }
      }
    }
    //console.log(reconcileParsed[0].linkingId, "This is the linking id");

    // console.log(
    //   "Ready to reconcile------->",
    //   reconcileParsed[0].data.candidates[0].formatted_address
    //     .toLowerCase()
    //     .includes("sri lanka"),
    //   "This is reconciled"
    // );

    const repairWithState = [];
    for (var i = 0; i < withCorrectState.length; i++) {
      for (var j = 0; j < reconcileParsed.length; j++) {
        if (withCorrectState[i].linkingId === reconcileParsed[j].linkingId) {
          const combined = {
            ...reconcileParsed[j],
            state: withCorrectState[i].correctState,
          };
          repairWithState.push(combined);
        }
      }
    }
    // FOR TESTING ONLY
    // for (var i = 0; i < repairWithState.length; i++) {
    //   console.log(repairWithState[i].state);
    // }

    const postRepair = [];
    for (var i = 0; i < repairWithState.length; i++) {
      const { state } = repairWithState[i];
      const copyObj = { ...repairWithState };
      for (var j = 0; j < repairWithState[i].data.candidates.length; j++) {
        if (
          repairWithState[i].data.candidates[j].formatted_address.includes(
            state
          )
        ) {
          const copied = { ...repairWithState[i].data.candidates[j] };
          const objWithCandidates = {
            ...repairWithState[i],
            needsInspection: true,
          };
          const newArr = [];
          newArr.push(copied);
          objWithCandidates.data.candidates = newArr;
          postRepair.push(objWithCandidates);
        } else {
          const copied = { ...repairWithState[i].data.candidates[j] };
          const objWithCandidates = {
            ...repairWithState[i],
            needsInspection: true,
          };
          const newArr = [];
          newArr.push(copied);
          objWithCandidates.data.candidates = newArr;
          objWithCandidates.purge = true;
          postRepair.push(objWithCandidates);
        }
        // console.log(repairWithState[i].data.candidates[j]);
      }
    }

    //parsedCandidates uses id, postrepaid uses linkingid

    const newCandidates = [...parsedCandidates];
    const confirmWorks = [...newCandidates];
    // console.log(newCandidates[0]);
    for (var i = 0; i < newCandidates.length; i++) {
      for (var j = 0; j < postRepair.length; j++) {
        if (newCandidates[i].id === postRepair[j].linkingId) {
          if (postRepair[j].purge === true) {
            newCandidates.splice(i, 1);
          } else {
            const replacement = {
              ...postRepair[j].data.candidates[0],
              gotIn: true,
              id: postRepair[j].linkingId,
            };
            newCandidates.splice(i, 1, replacement);
          }
        }
      }
    }

    let finalPurge = [];
    for (var i = 0; i < newCandidates.length; i++) {
      if (
        newCandidates[i].formatted_address.includes("United States") ||
        newCandidates[i].formatted_address.includes("USA")
      ) {
        finalPurge.push(newCandidates[i]);
      }
    }

    const strungFinal = JSON.stringify(finalPurge);
    await AsyncStorage.setItem("candidates", strungFinal);
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
        <Button onPress={this.reconcile} title={"Reconcile differences"} />
        <Button onPress={this.clearAsync} title={"Clear Async Storage"} />
        <Button onPress={this.numberGen} title={"Create a serial number"} />
        <Button onPress={this.sendToDb} title={"Send to backend"} />
        <Text>When da button get a pressed, da Db a getta filled...</Text>
      </View>
    );
  }
}
export default FillDb;

//07/01/2020 - need to set up backend to return ip, create fucking backhandler for every thing
