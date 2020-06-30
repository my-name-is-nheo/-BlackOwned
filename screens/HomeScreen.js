import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Text,
  View,
  Alert,
  Button,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import LoadingScreen from "./loadingScreen";
import Search from "./searchScreen";

export default function HomeScreen(props) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    console.log(props.noTimeOut, "should at some point be true");
    if (!props.noTimeOut) {
      setTimeout(() => {
        console.log("set timeout is running like an asshole");
        setIsLoaded(true);
        props.isHome();
      }, 5000);
    } else {
      console.log(isLoaded, props.homeValue, "isLoaded and propsHOmeValue");
      setIsLoaded(true);
      props.isHome();
    }
  });
  const openSearchPage = () => {
    props.history.push("/search");
    console.log("this is location pathname ", props.location.pathname);
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
            <TouchableOpacity style={styles.circularButton}>
              <View>
                <Text>Favorites</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={{ top: 60, left: 20 }}>
            <TouchableOpacity style={styles.circularButton}>
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
            <TouchableOpacity style={styles.circularButton}>
              <View>
                <Text>Setting</Text>
              </View>
            </TouchableOpacity>
          </View>
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
            <TouchableOpacity style={styles.circularButton}>
              <View>
                <Text>Favorites</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={{ top: 60, left: 20 }}>
            <TouchableOpacity style={styles.circularButton}>
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
            <TouchableOpacity style={styles.circularButton}>
              <View>
                <Text>Setting</Text>
              </View>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      )}
    </View>
  );
}

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
});
