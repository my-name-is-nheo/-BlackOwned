import React, { useState, useEffect } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import {
  Text,
  View,
  Alert,
  Button,
  StatusBar,
  Dimensions,
  StyleSheet,
  ImageBackground,
  AsyncStorage,
} from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import LoadingScreen from "./loadingScreen";
import Search from "./searchScreen";

export default function HomeScreen(props) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [token, setToken] = useState("");
  useEffect(() => {
    async function findToken() {
      const newToken = await AsyncStorage.getItem("userToken");
      setToken(newToken);
    }
    findToken();
    /*
7/16/2020 - You guys have to fix styling for 
name bar.  We should add a menu bar above it
that holds our login info and potentially our
log out.

Create a login component, make it so that it can both
log in and also block out malicious users if they
try to login in too many times.

We need to be able to access settings, add a vibrator


*/
    if (!props.noTimeOut) {
      setTimeout(() => {
        setIsLoaded(true);
        props.isHome();
      }, 5000);
    } else {
      setIsLoaded(true);
      props.isHome();
    }
  });

  const greeting = () => {
    if (token) {
      const untokener = jwt_decode(token);

      return (
        <TouchableOpacity style={styles.greetingButton}>
          <View>
            <Text>Welcome, {untokener.firstName}! </Text>
          </View>
        </TouchableOpacity>
      );
    }
  };

  const logOut = () => {
    if (token) {
      return (
        <View style={{ left: 50 }}>
          <TouchableOpacity
            onPress={async () => {
              await AsyncStorage.removeItem("userToken");
              setToken("");
            }}
            style={styles.circularButton}
          >
            <View>
              <Text>Log Out</Text>
            </View>
          </TouchableOpacity>
        </View>
      );
    }
    return null;
  };

  const openSearchPage = () => {
    props.cameFromBack(false);
    props.history.push("/search");
  };
  const openAdd = () => {
    props.cameFromBack(false);

    props.history.push("/add");
  };

  const goTofavorites = () => {
    props.cameFromBack(false);

    props.history.push("/favorites");
  };
  const goToSettings = () => {
    props.cameFromBack(false);

    props.history.push("/settings");
  };

  const goToRegister = () => {
    props.cameFromBack(false);
    props.history.push("/register");
  };
  const goToLogIn = () => {
    props.cameFromBack(false);
    props.history.push("/logIn");
  };

  return !props.noLoad ? (
    <View>
      {!isLoaded && <LoadingScreen />}
      {isLoaded && (
        <ImageBackground
          resizeMode="stretch"
          source={require("../assets/images/women.png")}
          style={{ height: "100%", width: "100%" }}
        >
          {greeting()}
          {!props.homeValue && (
            <View style={{ left: 50 }}>
              <TouchableOpacity style={styles.circularButton}>
                <View>
                  <Text>Home</Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
          <View style={{ left: 80, top: 40 }}>
            <TouchableOpacity
              onPress={goTofavorites}
              style={styles.circularButton}
            >
              <View>
                <Text>Favorites</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={{ top: 60, left: 20 }}>
            <TouchableOpacity style={styles.circularButton} onPress={openAdd}>
              <View>
                <Text>Add</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={{ top: 100, left: 120 }}>
            <TouchableOpacity
              style={styles.circularButton}
              onPress={openSearchPage}
            >
              <View>
                <Text>Search</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={{ top: 150, left: 150 }}>
            <TouchableOpacity
              onPress={goToSettings}
              style={styles.circularButton}
            >
              <View>
                <Text>Setting</Text>
              </View>
            </TouchableOpacity>
          </View>
          {!token && (
            <View style={{ left: 100, top: 100 }}>
              <TouchableOpacity
                onPress={goToLogIn}
                style={styles.circularButton}
              >
                <View>
                  <Text>Log in</Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
          {logOut()}
        </ImageBackground>
      )}
    </View>
  ) : (
    <View>
      {isLoaded && (
        <ImageBackground
          resizeMode="stretch"
          source={require("../assets/images/women.png")}
          style={{ height: "100%", width: "100%" }}
        >
          {greeting()}
          {!props.homeValue && (
            <View style={{ left: 50 }}>
              <TouchableOpacity style={styles.circularButton}>
                <View>
                  <Text>Home</Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
          <View style={{ left: 80, top: 40 }}>
            <TouchableOpacity
              onPress={goTofavorites}
              style={styles.circularButton}
            >
              <View>
                <Text>Favorites</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={{ top: 60, left: 20 }}>
            <TouchableOpacity onPress={openAdd} style={styles.circularButton}>
              <View>
                <Text>Add</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={{ top: 100, left: 120 }}>
            <TouchableOpacity
              style={styles.circularButton}
              onPress={openSearchPage}
            >
              <View>
                <Text>Search</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={{ top: 150, left: 150 }}>
            <TouchableOpacity
              onPress={goToSettings}
              style={styles.circularButton}
            >
              <View>
                <Text>Setting</Text>
              </View>
            </TouchableOpacity>
          </View>
          {!token && (
            <View style={{ left: 100, top: 100 }}>
              <TouchableOpacity
                onPress={goToLogIn}
                style={styles.circularButton}
              >
                <View>
                  <Text>Log in</Text>
                </View>
              </TouchableOpacity>
            </View>
          )}

          {logOut()}
        </ImageBackground>
      )}
    </View>
  );
}

const screenWidth = Math.round(Dimensions.get("window").width);

const styles = StyleSheet.create({
  circularButton: {
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.2)",
    alignItems: "center",
    justifyContent: "center",
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "pink",
  },
  greetingButton: {
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.2)",
    left: screenWidth - 100,
    top: Platform.OS === "android" ? StatusBar.currentHeight + 22 : 0,
    justifyContent: "center",
    width: 100,
    height: 100,

    backgroundColor: "pink",
  },
});
