import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Overlay, Card } from "react-native-elements";
import {
  View,
  Text,
  TouchableOpacity,
  Linking,
  AsyncStorage,
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
        if (loggedIn.data) {
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

  return loggedIn ? (
    <View>
      <Overlay isVisible={props.visible} onBackdropPress={props.notVisible}>
        <Card
          title={props.locationName}
          image={{
            uri: props.imgUri,
          }}
        >
          <Text style={{ marginBottom: 10 }}>
            <Text style={{ fontWeight: "bold" }}>Address:</Text> {props.address}
          </Text>
          <TouchableOpacity
            onPress={() => {
              Linking.openURL(`tel:${props.phoneNumber}`);
            }}
          >
            <Text style={{ marginBottom: 10 }}>
              <Text style={{ fontWeight: "bold" }}>Phone Number:</Text>{" "}
              {props.phoneNumber}
            </Text>
          </TouchableOpacity>
          {props.openNow !== "" && (
            <Text style={{ marginBottom: 10 }}>
              <Text
                style={{
                  fontWeight: "bold",
                  color: props.openNow.open_now ? "blue" : "red",
                }}
              >
                {props.openNow.open_now ? "Open Now" : "Closed"}
              </Text>
            </Text>
          )}
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
            title="Take political action and earn incentives now!"
          />
        </Card>
      </Overlay>
    </View>
  ) : (
    <View>
      <Overlay isVisible={props.visible} onBackdropPress={props.notVisible}>
        <Card
          title={props.locationName}
          image={{
            uri: props.imgUri,
          }}
        >
          <Text style={{ marginBottom: 10 }}>
            <Text style={{ fontWeight: "bold" }}>Address:</Text> {props.address}
          </Text>
          <TouchableOpacity
            onPress={() => {
              Linking.openURL(`tel:${props.phoneNumber}`);
            }}
          >
            <Text style={{ marginBottom: 10 }}>
              <Text style={{ fontWeight: "bold" }}>Phone Number:</Text>{" "}
              {props.phoneNumber}
            </Text>
          </TouchableOpacity>
          {props.openNow !== "" && (
            <Text style={{ marginBottom: 10 }}>
              <Text
                style={{
                  fontWeight: "bold",
                  color: props.openNow.open_now ? "blue" : "red",
                }}
              >
                {props.openNow.open_now ? "Open Now" : "Closed"}
              </Text>
            </Text>
          )}
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
