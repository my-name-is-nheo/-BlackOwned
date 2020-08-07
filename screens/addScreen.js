import React, { useState, useEffect } from "react";
import { TextField } from "react-native-materialui-textfield";
import {
  View,
  Dimensions,
  SafeAreaView,
  BackHandler,
  TouchableOpacity,
  Button,
  StatusBar,
  TextInput,
} from "react-native";
import { ScrollView, TapGestureHandler } from "react-native-gesture-handler";
/*
- everything should work, only problem is user will have trouble seeing some input as screen does not appear to automatically populate to current textField.
*/
class AddScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nOb: null,
      aL1: null,
      aL2: null,
      city: null,
      country: null,
      stateProvince: null,
      zip: null,
      comment: null,
    };
    this.screenWidth = Math.round(Dimensions.get("window").width);
  }

  componentDidMount = () => {
    console.log("compound did mount ran");
    console.log(this.props.backValue, " This is the backvalue");

    if (!this.props.backValue) {
      this.props.updateHistory(this.props.history.location.pathname);
    }

    BackHandler.addEventListener("hardwareBackPress", this.backOne);
  };
  componentWillUnmount = () => {
    BackHandler.removeEventListener("hardwareBackPress", this.backOne);
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
  returnMappedInputs = () => {
    const inputFields = [
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
        label: "Country",
        value: this.state.country,
        onChange: this.onChangeCountry,
      },
      {
        label: "State/Province",
        value: this.state.stateProvince,
        onChange: this.onChangeStateProvince,
      },
    ];
    const mappedInputs = inputFields.map((item, i) => {
      return (
        <TextField
          key={i}
          activeLineWidth={3}
          onChangeText={(e) => {
            item.onChange(e);
          }}
          label={item.label}
          editable
        />
      );
    });
    return mappedInputs;
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
  onChangeCountry = (e) => {
    this.setState({ country: e });
  };
  onChangeStateProvince = (e) => {
    this.setState({ stateProvince: e });
  };
  handleAdd = () => {
    const userInput = { ...this.state };
    console.log(userInput, "this is the state that will go to backend");
  };
  render() {
    return (
      <View>
        <TouchableOpacity>
          <View
            style={{
              paddingTop:
                Platform.OS === "android" ? StatusBar.currentHeight : 0,
            }}
          >
            <View
              style={{
                backgroundColor: "pink",
                width: 300,
              }}
            >
              <ScrollView>
                {this.returnMappedInputs()}
                <TextField
                  label="Zip/Postal Code"
                  keyboardType="number-pad"
                  onChangeText={(e) => {
                    this.setState({ zip: e });
                  }}
                />

                <TextField
                  multiline={true}
                  label="Comment"
                  onChangeText={(e) => {
                    this.setState({ comment: e });
                  }}
                />
              </ScrollView>
              <Button title="Add" onPress={this.handleAdd} />
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}
export default AddScreen;

//07/01/2020 - need to set up backend to return ip, create fucking backhandler for every thing
