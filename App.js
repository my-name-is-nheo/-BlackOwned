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

export default function App(props) {
  const [isHome, setIsHome] = useState(false);
  const [noLoad, setNoLoad] = useState(false);
  const [nto, setNto] = useState(false);
  const createHome = function () {
    setIsHome(true);
    console.log("creatHome is working");
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
              console.log(props, "Props");
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
