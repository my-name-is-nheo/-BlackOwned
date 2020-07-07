import React, { Component, PropTypes } from "react";
import { Linking, Text, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export default class HyperLink extends Component {
  constructor() {
    super();
    this._goToURL = this._goToURL.bind(this);
  }

  //   static propTypes = {
  //     url: PropTypes.string.isRequired,
  //     title: PropTypes.string.isRequired,
  //   };

  render() {
    const { title } = this.props;

    return (
      <TouchableOpacity style={styles.title} onPress={this._goToURL}>
        <Text style={{ textAlign: "center" }}>{title}</Text>
      </TouchableOpacity>
    );
  }

  _goToURL() {
    const { url } = this.props;
    Linking.canOpenURL(url).then((supported) => {
      if (supported) {
        console.log("got to is supported");
        Linking.openURL(this.props.url);
      } else {
        console.log("Don't know how to open URI: " + this.props.url);
      }
    });
  }
}

const styles = StyleSheet.create({
  title: {
    color: "#acacac",
    fontWeight: "bold",
    textAlign: "center",
  },
});
