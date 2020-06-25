import React, { useState, useEffect } from "react";
import { ipService } from "../services/ipService";
import { View, Text } from "react-native";

import ip from "../services/ipService";

export default function Search() {
  const [ipState, setIpState] = useState(null);
  useEffect(() => {
    const ipCall = async () => {
      try {
        const ipResult = await ip();
        console.log("useEffect from searchScreen is working");
        setIpState(ipResult);
      } catch (error) {
        console.log("useEffect is not working on searchScreen");
      }
    };
    ipCall();
  }, []);
  console.log(ipState);

  return (
    <View style={{ height: 10, width: 10, backgroundColor: "yellow" }}>
      <Text>Hello</Text>
    </View>
  );
}
