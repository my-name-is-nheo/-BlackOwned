import React, { useState } from "react";
import { AsyncStorage } from "react-native";
import { Overlay, Card, colors, Input, Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import axios from "axios";

import { View, Text, TouchableOpacity, Image, Linking } from "react-native";
const LoginOverlay = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const setInfo = (e, callBack) => {
    callBack(e.nativeEvent.text);
  };
  const submit = async () => {
    try {
      const payload = { email, password };
      const postToken = await axios.post(
        "http://192.168.43.49:5000/api/userLogin/",
        payload
      );
      const token = postToken.headers["x-auth-token"];
      await AsyncStorage.setItem("userToken", token);
      props.removeOverlay();
      props.update();

      //  const hearts = await props.findHearts()
      //   props.setHearts({heart: hearts})
    } catch (err) {
      if (err.response.data === "Either password or email is incorrect.") {
        console.log(
          err.response.data,
          "axios post failed, you're hitting an error"
        );
        props.removeOverlay();
      }
      //   if (err.response.data === "banned") {
      //     this.props.cameFromBack(false);

      //     this.props.history.push("/banned");
      //   }
    }
  };
  return (
    <View>
      <Overlay
        overlayStyle={{ width: "100%" }}
        isVisible={props.visible}
        onBackdropPress={props.removeOverlay}
      >
        <Card title="Login required">
          <Input
            onChange={(e) => {
              setInfo(e, setEmail);
            }}
            placeholder="Enter your email"
          />
          <Input
            onChange={(e) => {
              setInfo(e, setPassword);
            }}
            placeholder="Enter your password"
          />
          <Button onPress={submit} title="submit" />
        </Card>
        {/* <Card
          title={props.locationName}

          // image={{
          //   uri: "../images/blackPowerFist.jpg",
          //   height: "200px",
          // }}
        >
          <Image
            source={{ uri: "../images/blackPowerFist.png" }}
            style={styles.imageStyle}

            //   PlaceholderContent={<Icon name="user" color="#ffffff" />} //<ActivityIndicator />}
          />
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
        </Card> */}
      </Overlay>
    </View>
  );
};
export default LoginOverlay;
