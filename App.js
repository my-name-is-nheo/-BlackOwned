import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import {
  Text,
  Platform,
  StatusBar,
  StyleSheet,
  View,
  SafeAreaView,
} from "react-native";
import { NativeRouter, Route, Link } from "react-router-native";
import Test from "./screens/test.js";
import HomeScreen from "./screens/HomeScreen";
import useCachedResources from "./hooks/useCachedResources";

const Stack = createStackNavigator();

export default function App(props) {
  const isLoadingComplete = useCachedResources();
  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <NativeRouter>
        <SafeAreaView>
          {/* <Link to="/test">
            <Text>To Test.js</Text>
          </Link> */}
          <Route path="/" component={HomeScreen}></Route>
        </SafeAreaView>
      </NativeRouter>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
