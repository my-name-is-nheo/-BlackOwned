import React, { useState } from "react";
import {
  Text,
  Platform,
  StatusBar,
  StyleSheet,
  View,
  SafeAreaView,
} from "react-native";
import { NativeRouter, Route, Link } from "react-router-native";
import HomeScreen from "./screens/HomeScreen";

export default function App(props) {
  const [isHome, setIsHome] = useState(false);
  const createHome = function () {
    setIsHome(true);
    console.log("creatHome is working");
  };
  return (
    <NativeRouter>
      <SafeAreaView>
        {/* <Link to="/test">
            <Text>To Test.js</Text>
          </Link> */}
        <Route
          path="/"
          render={({ ...props }) => {
            return (
              <HomeScreen {...props} isHome={createHome} homeValue={isHome} />
            );
          }}
        ></Route>
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
