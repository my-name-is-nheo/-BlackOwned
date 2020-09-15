import React, { useState } from "react";
import {
  Text,
  Platform,
  StatusBar,
  StyleSheet,
  View,
  SafeAreaView,
} from "react-native";
import { NativeRouter, Route, Link, Switch } from "react-router-native";
import HomeScreen from "./screens/HomeScreen";
import AddScreen from "./screens/Add/addScreen";
import FavoriteScreen from "./screens/favoriteScreen";
import SettingScreen from "./screens/settingScreen";
import RegisterScreen from "./screens/registerScreen";
import LoginScreen from "./screens/loginScreen";
import BannedScreen from "./screens/bannedScreen";
import FillDb from "./screens/fillDb";
import SearchScreen from "./screens/Search/SearchScreen";

export default function App(props) {
  const [isHome, setIsHome] = useState(false);
  const [noLoad, setNoLoad] = useState(false);
  const [nto, setNto] = useState(false);
  const [fromBack, setFromBack] = useState(false);
  const [backHistory, setBackHistory] = useState({
    presentLocation: "/",
    historyArray: [],
  });
  const [heartPressed, setHeartPressed] = useState({});
  const createHome = function () {
    setIsHome(true);
  };
  const createNoLoad = () => {
    setNoLoad(true);
  };
  const noTimeOut = () => {
    setNto(true);
  };
  const cameFromBack = (value) => {
    setFromBack(value);
  };

  //{pl: /add, ha: [/add,/]}
  const updateHistory = (history) => {
    const updateObject = { ...backHistory };
    updateObject.historyArray.unshift(updateObject.presentLocation);
    updateObject.presentLocation = history;

    setBackHistory(updateObject);
  };
  const fixHistory = (present) => {
    const updateObject = { ...backHistory };
    updateObject.presentLocation = present;
    updateObject.historyArray.shift();
  };
  const handleHeartPress = (i) => {
    const newHeartPressed = { ...heartPressed };
    if (!newHeartPressed[i]) {
      newHeartPressed[i] = false;
    }
    newHeartPressed[i] = !newHeartPressed[i];
    setHeartPressed(newHeartPressed);
  };

  // {presentUri: locationX, historyArray: [locationY, locationZ]}

  return (
    <NativeRouter>
      <SafeAreaView>
        <Switch>
          <Route
            path="/search"
            exact
            render={(props) => {
              return (
                <SearchScreen
                  {...props}
                  heartPressed={heartPressed}
                  handleHeartPress={handleHeartPress}
                  backValue={fromBack}
                  cameFromBack={cameFromBack}
                  updateHistory={updateHistory}
                  noTimeOut={noTimeOut}
                  noLoad={createNoLoad}
                  backOne={props.history.entries[0].pathname}
                  back={backHistory.historyArray[0]}
                  fixHistory={fixHistory}
                />
              );
            }}
          ></Route>
          <Route
            path="/add"
            exact
            render={(props) => {
              return (
                <AddScreen
                  {...props}
                  backValue={fromBack}
                  updateHistory={updateHistory}
                  cameFromBack={cameFromBack}
                  noTimeOut={noTimeOut}
                  noLoad={createNoLoad}
                  backOne={props.history.entries[0].pathname}
                  back={backHistory.historyArray[0]}
                  fixHistory={fixHistory}
                />
              );
            }}
          ></Route>
          <Route
            path="/fillDb"
            exact
            render={(props) => {
              return (
                <FillDb
                  {...props}
                  backValue={fromBack}
                  updateHistory={updateHistory}
                  cameFromBack={cameFromBack}
                  noTimeOut={noTimeOut}
                  noLoad={createNoLoad}
                  backOne={props.history.entries[0].pathname}
                  back={backHistory.historyArray[0]}
                  fixHistory={fixHistory}
                />
              );
            }}
          ></Route>
          <Route
            path="/register"
            exact
            render={(props) => {
              return (
                <RegisterScreen
                  {...props}
                  backValue={fromBack}
                  updateHistory={updateHistory}
                  cameFromBack={cameFromBack}
                  noTimeOut={noTimeOut}
                  noLoad={createNoLoad}
                  backOne={props.history.entries[0].pathname}
                  back={backHistory.historyArray[0]}
                  fixHistory={fixHistory}
                />
              );
            }}
          ></Route>
          <Route
            path="/favorites"
            exact
            render={(props) => {
              return (
                <FavoriteScreen
                  {...props}
                  backValue={fromBack}
                  cameFromBack={cameFromBack}
                  updateHistory={updateHistory}
                  noTimeOut={noTimeOut}
                  noLoad={createNoLoad}
                  backOne={props.history.entries[0].pathname}
                  back={backHistory.historyArray[0]}
                  fixHistory={fixHistory}
                />
              );
            }}
          ></Route>
          <Route
            path="/settings"
            exact
            render={(props) => {
              return (
                <SettingScreen
                  {...props}
                  backValue={fromBack}
                  cameFromBack={cameFromBack}
                  updateHistory={updateHistory}
                  noTimeOut={noTimeOut}
                  noLoad={createNoLoad}
                  backOne={props.history.entries[0].pathname}
                  back={backHistory.historyArray[0]}
                  fixHistory={fixHistory}
                />
              );
            }}
          ></Route>
          <Route
            path="/logIn"
            exact
            render={(props) => {
              return (
                <LoginScreen
                  {...props}
                  backValue={fromBack}
                  cameFromBack={cameFromBack}
                  updateHistory={updateHistory}
                  noTimeOut={noTimeOut}
                  noLoad={createNoLoad}
                  backOne={props.history.entries[0].pathname}
                  back={backHistory.historyArray[0]}
                  fixHistory={fixHistory}
                />
              );
            }}
          ></Route>
          <Route
            path="/banned"
            exact
            render={(props) => {
              return (
                <BannedScreen
                  {...props}
                  noTimeOut={noTimeOut}
                  noLoad={createNoLoad}
                  backOne={props.history.entries[0].pathname}
                />
              );
            }}
          ></Route>
          <Route
            path="/"
            exact
            render={(props) => {
              return (
                <HomeScreen
                  {...props}
                  noTimeOut={nto}
                  cameFromBack={cameFromBack}
                  noLoad={noLoad}
                  isHome={createHome}
                  homeValue={isHome}
                />
              );
            }}
          ></Route>
        </Switch>
        {/* <Link to="/test">
            <Text>To Test.js</Text>
          </Link> */}
      </SafeAreaView>
    </NativeRouter>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

/*
07/09/2020

Find a way to make search results clickable and stylable in search screen
Make each result searchable on Google

Find way of including data payload in an element so
that it can be fed to serpsearch api without user seeing it.

Once test function on searchScreen demonstrates that we can successfully carry out a search, then implement
functionality that allows user to click on name and receive a list of Google links



*/
