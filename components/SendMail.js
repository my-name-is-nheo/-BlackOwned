import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Overlay, Card, Input } from "react-native-elements";
import {
  View,
  Text,
  TouchableOpacity,
  Linking,
  AsyncStorage,
  TextInput,
} from "react-native";
import decode from "jwt-decode";
import token from "../token";

const SendMail = (props) => {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    async function checkIfLoggedIn() {
      try {
        const newToken = await AsyncStorage.getItem("userToken");
        const decodedTokenEmail = decode(newToken).email;
        const isLoggedIn = await axios.post(`${token.backendApi}/users/auth`, {
          email: decodedTokenEmail,
        });

        if (isLoggedIn.data === true) {
          setLoggedIn(true);
        } else {
          setLoggedIn(false);
        }
      } catch (error) {
        console.log(error, "This is the error from sendMail.js");
      }
    }
    checkIfLoggedIn();
  });
  console.log(loggedIn, "THIS IS LOGGED IN");
  return loggedIn ? (
    <View>
      <Overlay isVisible={props.visible} onBackdropPress={props.notVisible}>
        <Card
          title={
            "Want to create positive change for the African-American community?  Let us send a letter on your behalf to your local representative demanding they take swift and decisive action for the betterment of marginalized communities!"
          }
        >
          <Button
            // icon={{ name: "code" }}
            backgroundColor="#03A9F4"
            fontFamily="Lato"
            buttonStyle={{
              borderRadius: 0,
              marginLeft: 0,
              marginRight: 0,
              marginBottom: 0,
            }}
            onPress={() => {
              props.handleActionButton();
            }}
            title="Sure! Let's amplify their voices!"
          />
        </Card>
      </Overlay>
    </View>
  ) : (
    <View>
      <Overlay isVisible={props.visible} onBackdropPress={props.notVisible}>
        <Card title={props.locationName}>
          <Button
            // icon={{ name: "code" }}
            backgroundColor="#03A9F4"
            fontFamily="Lato"
            buttonStyle={{
              borderRadius: 0,
              marginLeft: 0,
              marginRight: 0,
              marginBottom: 0,
            }}
            onPress={() => {
              props.handleActionButton();
            }}
            title="This is the not logged in version"
          />
        </Card>
      </Overlay>
    </View>
  );
};
export default SendMail;
