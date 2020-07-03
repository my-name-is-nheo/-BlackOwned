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
  const openSearchPage = () => {
    props.history.push("/search");
  };
  const openAdd = () => {
    props.history.push("/add");
  };

  const goTofavorites = () => {
    props.history.push("/favorites");
  };
  const goToSettings = () => {
    props.history.push("/settings");
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
