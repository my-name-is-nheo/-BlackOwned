import * as React from "react";
import styles from "./TabItem.component.style";
import TabNavigator from "react-native-tab-navigator";

import Icon from "react-native-vector-icons/FontAwesome";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import { Dimensions } from "react-native";

const deviceW = Dimensions.get("window").width;
const basePx = 375;
/* 
function px2dp(px) {
  return (px * deviceW) / basePx;
} */
class TabItem extends React.Component {
  constructor(props) {
    super(props);
    console.log("props", props);
  }

  render() {
    console.log("props", this.props);
    return <Text>{"HEY"}</Text>;
    {
      /* <TabNavigator.Item
        selected={this.props.selectedTab === this.props.tabName}
        selectedTitleStyle={{ color: "#3496f0" }}
        renderIcon={() => (
          <Icon name={this.props.iconName} size={px2dp(22)} color="#666" />
        )}
        renderSelectedIcon={() => (
          <Icon name={this.props.iconName} size={px2dp(22)} color="#3496f0" />
        )}
        //badgeText="1"
        onPress={() => console.log("[ress")} //this.setState({ selectedTab: this.props.tabName })}
      >
        {this.props.children}
      </TabNavigator.Item> */
    }
    //   );
  }
}

export default TabItem;
