import React from "react";
import { Text, View, Alert, Button } from "react-native";

export default function loadingScreen() {
  return (
    <View style={{ display: "flex" }}>
      <View style={{ flex: 1 }}></View>
      <View
        style={{
          top: 400,
          justifyContent: "center",
          alignItems: "center",
          alignContent: "center",
        }}
      >
        <Text>Let's get </Text>
        <Text styles={{}}>Bizzy</Text>
      </View>
      <View style={{ flex: 1 }}></View>
    </View>
  );
}
