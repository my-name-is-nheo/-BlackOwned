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

import { MonoText } from "../components/StyledText";

export default function HomeScreen(props) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true);
      props.isHome();
    }, 5000);
  });
  return (
    <View>
      {!isLoaded && <LoadingScreen />}
      {isLoaded && (
        <ImageBackground
          source={require("../assets/images/women.png")}
          style={{ height: "100%", width: "100%" }}
        >
          {/* <Button
              title="Press me to Subtract"
              onPress={() => {
                Alert.alert("Alert", "Your button is working", [
                  {
                    text: "Make Call",
                    onPress: async () => {
                      try {
                        console.log("You pressed Make Call.");
                        const response = await axios.get(
                          "http://localhost:3333/getName/"
                        );
                        console.log(response.data);
                      } catch (error) {
                        console.log(error);
                      }
                    },
                  },
                  {
                    text: "Cancel",
                    onPress: () => {
                      console.log("You pressed Cancel.");
                    },
                  },
                ]);
              }}
            /> */}
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
            <TouchableOpacity style={styles.circularButton}>
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
