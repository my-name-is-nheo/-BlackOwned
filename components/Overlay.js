import React, { useState } from "react";
import { Button, Overlay, Card, colors } from "react-native-elements";
import { View, Text, TouchableOpacity, Image, Linking } from "react-native";

const OverlayTest = (props) => {
  return (
    <View>
      <Overlay isVisible={props.visible} onBackdropPress={props.removeOverlay}>
        <Card
          title={props.locationName}
          // image={{
          //   uri: "../images/blackPowerFist.jpg",
          //   height: "200px",
          // }}
        >
          <Card.Image
            source={require("../images/blackPowerFist.jpg")}
          ></Card.Image>
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
  );
};
export default OverlayTest;
