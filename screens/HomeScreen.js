import React, { useState, useEffect } from "react";
import axios from "axios";
import { Text, View, Alert, Button } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

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
      {!isLoaded && (
        <View>
          <Text>This is your loading screen. </Text>
        </View>
      )}
      {isLoaded && (
        <View>
          <ScrollView>
            <View>
              <Button
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
              />
            </View>

            <View>
              <Text>Open up the code for this screen:</Text>

              <View>
                <MonoText>screens/HomeScreen.js</MonoText>
              </View>

              <Text>
                Change any of the text, save the file, and your app will
                automatically reload.
              </Text>
            </View>
          </ScrollView>

          <View>
            <Text>This is a tab bar. You can edit it in:</Text>

            <View>
              <MonoText>navigation/BottomTabNavigator.js</MonoText>
            </View>
          </View>
        </View>
      )}
    </View>
  );
}
