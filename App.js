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
import Search from "./screens/searchScreen";
import AddScreen from "./screens/addScreen";
import FavoriteScreen from "./screens/favoriteScreen";
import SettingScreen from "./screens/settingScreen";

export default function App(props) {
  const [isHome, setIsHome] = useState(false);
  const [noLoad, setNoLoad] = useState(false);
  const [nto, setNto] = useState(false);
  const createHome = function () {
    setIsHome(true);
  };
  const createNoLoad = () => {
    setNoLoad(true);
  };
  const noTimeOut = () => {
    setNto(true);
  };

  return (
    <NativeRouter>
      <SafeAreaView>
        <Switch>
          <Route
            path="/search"
            exact
            render={(props) => {
              return (
                <Search
                  {...props}
                  noTimeOut={noTimeOut}
                  noLoad={createNoLoad}
                  backOne={props.history.entries[0].pathname}
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
                  noTimeOut={noTimeOut}
                  noLoad={createNoLoad}
                  backOne={props.history.entries[0].pathname}
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
                  noTimeOut={noTimeOut}
                  noLoad={createNoLoad}
                  backOne={props.history.entries[0].pathname}
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
07/06/2020 
Find way of including data payload in an element so 
that it can be fed to serpsearch api without user seeing it.

Once test function on searchScreen demonstrates that we can successfully carry out a search, then implement
functionality that allows user to click on name and receive a list of Google links



*/
