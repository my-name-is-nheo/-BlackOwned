import React, { useState, useEffect } from "react";
// import { Picker } from "@react-native-community/picker";
import { material, robotoWeights } from "react-native-typography";
import {
  Text,
  View,
  Dimensions,
  BackHandler,
  Button,
  StatusBar,
  StyleSheet,
  KeyboardAvoidingView,
  TextInput,
  Picker,
  Animated,
  Keyboard,
} from "react-native";
import { ScrollView, TapGestureHandler } from "react-native-gesture-handler";
import axios from "axios";
import COUNTRIES from "../constants/Countries";
import BUSINESS_CATEGORIES from "../constants/BusinessCategories";

const window = Dimensions.get("window");
const image_Height = window.width / 2;
const image_HeightSmall = window.width / 4;
const logo = require("../images/blm.png");
/*
- everything should work, only problem is user will have trouble seeing some input as screen does not appear to automatically populate to current textField.


*/
class AddScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category: null,
      nOb: null,
      aL1: null,
      aL2: null,
      city: null,
      country: null,
      stateProvince: null,
      zip: null,
      comment: null,
    };
    this.imageHeight = new Animated.Value(image_Height);
  }

  componentDidMount = () => {
    if (Platform.OS == "ios") {
      this.keyboardWillShowSub = Keyboard.addListener(
        "keyboardWillShow",
        this.keyboardWillShow
      );
      this.keyboardWillHideSub = Keyboard.addListener(
        "keyboardWillHide",
        this.keyboardWillHide
      );
    } else {
      this.keyboardWillShowSub = Keyboard.addListener(
        "keyboardDidShow",
        this.keyboardDidShow
      );
      this.keyboardWillHideSub = Keyboard.addListener(
        "keyboardDidHide",
        this.keyboardDidHide
      );
    }
    if (!this.props.backValue) {
      this.props.updateHistory(this.props.history.location.pathname);
    }

    BackHandler.addEventListener("hardwareBackPress", this.backOne);
  };
  componentWillUnmount = () => {
    this.keyboardWillShowSub.remove();
    this.keyboardWillHideSub.remove();

    BackHandler.removeEventListener("hardwareBackPress", this.backOne);
  };
  keyboardWillShow = (event) => {
    Animated.timing(this.imageHeight, {
      duration: event.duration,
      toValue: image_HeightSmall,
    }).start();
  };

  keyboardWillHide = (event) => {
    Animated.timing(this.imageHeight, {
      duration: event.duration,
      toValue: image_Height,
    }).start();
  };

  keyboardDidShow = (event) => {
    Animated.timing(this.imageHeight, {
      toValue: image_HeightSmall,
    }).start();
  };

  keyboardDidHide = (event) => {
    Animated.timing(this.imageHeight, {
      toValue: image_Height,
    }).start();
  };

  backOne = () => {
    this.props.noTimeOut();
    this.props.noLoad();
    this.props.cameFromBack(true);
    this.props.history.push(this.props.back);
    this.props.fixHistory(this.props.back);
    this.props.history.push(this.props.backOne);
    return true;
  };
  returnCountryInputs = () => {
    const MERICA = ["United States"];
    //or COUNTRIES for ALL
    const COUNTRYPICKER = MERICA.map((country, key) => {
      return <Picker.Item key={key} label={country} value={country} />;
    });
    return COUNTRYPICKER;
  };
  returnPickerInputs = () => {
    const BUSINESSPICKER = BUSINESS_CATEGORIES.map((category, key) => {
      return <Picker.Item key={key} label={category} value={category} />;
    });
    return BUSINESSPICKER;
  };
  returnMappedInputs = () => {
    const INPUT_FIELDS = [
      {
        label: "Name of Business",
        value: this.state.nOb,
        onChange: this.onChangeNoB,
      },
      {
        label: "Address Line 1",
        value: this.state.aL1,
        onChange: this.onChangeAL1,
      },
      {
        label: "Address Line 2",
        value: this.state.aL2,
        onChange: this.onChangeAL2,
      },
      { label: "City", value: this.state.city, onChange: this.onChangeCity },
      {
        label: "State/Province",
        value: this.state.stateProvince,
        onChange: this.onChangeStateProvince,
      },
    ];
    const MAPPED_INPUTS = INPUT_FIELDS.map((item, i) => {
      return (
        <TextInput
          style={styles.input}
          key={i}
          onChangeText={(e) => {
            item.onChange(e);
          }}
          placeholder={item.label}
        />
      );
    });
    return MAPPED_INPUTS;
  };
  onChangeNoB = (e) => {
    this.setState({ nOb: e });
  };
  onChangeAL1 = (e) => {
    this.setState({ aL1: e });
  };
  onChangeAL2 = (e) => {
    this.setState({ aL2: e });
  };
  onChangeCity = (e) => {
    this.setState({ city: e });
  };

  onChangeStateProvince = (e) => {
    this.setState({ stateProvince: e });
  };

  onChangeZipCode = (e) => {
    this.setState({ zip: e });
  };

  onChangeComment = (e) => {
    this.setState({ comment: e });
  };
  setSelectedCatergory = (itemValue, itemIndex) => {
    // itemValue = value prop of the item that was selected. itemPosition = the index of the selected item in this picker
    this.setState({ category: itemValue });
  };
  setSelectedCountry = (itemValue, itemIndex) => {
    // itemValue = value prop of the item that was selected. itemPosition = the index of the selected item in this picker
    this.setState({ country: itemValue });
  };

  handleAddEvent = async () => {
    try {
      const USER_INPUT = { ...this.state };
      console.log(USER_INPUT, "this is the state that will go to backend");
      const POST_REQUEST = await axios.post(
        // "http://192.168.1.233:19000/api/add/",
        "http://192.168.1.233:5000/api/add/",
        USER_INPUT
      );
      return POST_REQUEST.data;
    } catch (err) {
      console.log(err, "err with post request on addSCreen");
    }
  };
  render() {
    return (
      <View
        style={{
          paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        }}
      >
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
          <Text
            style={[
              material.headline,
              styles.text,
              robotoWeights.condensedBold,
            ]}
          >
            Local Business not located? Add and promote them yourself!
          </Text>
          <Animated.Image
            source={logo}
            style={[styles.logo, { height: this.imageHeight }]}
          />
          <ScrollView>
            <Picker
              style={styles.input}
              selectedValue={this.state.category}
              onValueChange={this.setSelectedCatergory}
            >
              {this.returnPickerInputs()}
            </Picker>
            {this.returnMappedInputs()}
            <TextInput
              style={styles.input}
              placeholder="Zip/Postal Code"
              keyboardType="number-pad"
              onChangeText={this.onChangeZipCode}
            />
            <Picker
              style={styles.input}
              selectedValue={this.state.country}
              onValueChange={this.setSelectedCountry}
            >
              {this.returnCountryInputs()}
            </Picker>

            <TextInput
              style={styles.input}
              maxLength={300}
              placeholder="Comment"
              onChangeText={this.onChangeComment}
            />
          </ScrollView>
          <Button title="Add" onPress={this.handleAddEvent} />
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#356859",
    alignItems: "center",
    justifyContent: "center",
    height: window.height - 10,
  },
  form: {
    width: 250,
  },
  input: {
    height: 50,
    backgroundColor: "#fff",
    marginHorizontal: 10,
    marginVertical: 5,
    width: window.width - 30,
  },
  text: { textAlign: "center" },
  logo: {
    height: image_Height,
    resizeMode: "contain",
    marginBottom: 20,
    padding: 10,
    marginTop: 20,
    backgroundColor: "#356859",
  },
});
export default AddScreen;

//07/01/2020 - need to set up backend to return ip, create fucking backhandler for every thing
