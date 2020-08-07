import React from "react";
import { View, Text } from "react-native";
import { Header, Avatar } from "react-native-elements";
import styles from "./BusinessesHeader.component.style";
import BusinessSearchBar from "./BusinessSearchBar/BusinessSearchBar.component";

class BusinessesHeader extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Header
        statusBarProps={{ barStyle: "light-content" }}
        barStyle="light-content" // or directly
        leftComponent={{ icon: "menu" }}
        centerComponent={<BusinessSearchBar />}
        rightComponent={
          <Avatar
            size="small"
            rounded
            overlayContainerStyle={{ backgroundColor: "#44484c" }}
            //title="MT"
            icon={{ name: "user", type: "font-awesome" }}
            onPress={() => console.log("Works!")}
            activeOpacity={0.7}
          />
        }
        containerStyle={{
          backgroundColor: "#44484c",
          justifyContent: "space-around",
        }}
        leftContainerStyle={{ flex: 0 }}
        centerContainerStyle={{ flex: 1 }}
        rightContainerStyle={{ flex: 0 }}
      />
    );
  }
}
export default BusinessesHeader;
