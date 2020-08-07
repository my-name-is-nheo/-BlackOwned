import * as React from "react";
import { View, ActivityIndicator } from "react-native";

export function Loading(props) {
  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        width: "100%",
      }}
    >
      <ActivityIndicator size="large" />
    </View>
  );
}
