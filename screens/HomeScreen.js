import React, { useState, useEffect } from "react";
import axios from "axios";
import { Text, View, Alert, Button, StyleSheet } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import LoadingScreen from "./loadingScreen";

import { MonoText } from "../components/StyledText";

export default function HomeScreen() {
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true);
    }, 5000);
  });
  return (
    <View>
      {!isLoaded && <LoadingScreen />}
      {isLoaded && (
        <View>
          <View>
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
            <TouchableOpacity>
              <Text style={styles.circularButton}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.circularButton}>Favorites</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.circularButton}>Add</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.circularButton}>Search</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.circularButton}>Setting</Text>
            </TouchableOpacity>
          </View>
        </View>
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
  },
});
