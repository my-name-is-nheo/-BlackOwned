import * as React from "react";

import { View, ScrollView, Text, ActivityIndicator } from "react-native";
import BusinessCard from "../BusinessCard/BusinessCard.component";
import { Loading } from "../Loading/Loading.component";

class BusinessesList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (!this.props.businesses) {
      return <Loading />;
    } else if (this.props.businesses.length == 0) {
      return (
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <MaterialIcons name="error" size={100} color="black" />
          <Text style={{ marginTop: 20, fontSize: 20, marginBottom: 40 }}>
            No businesses found in your area!
          </Text>
          <HyperLink
            title={
              "Click here to donate towards the growth of black-owned enterprises"
            }
            url={
              "https://www.gofundme.com/f/protesters-and-bond-funds?fbclid=IwAR33GbMbn-7YN-w0Xh5YBNoFf1_48RGToeinYeXOaqJUl7xrYWbbm1c2E5E"
            }
          />
        </View>
      );
    } else {
      return (
        <ScrollView
          style={{
            width: "100%",
          }}
        >
          {
            (results = this.props.businesses.map((business, id) => {
              return <BusinessCard key={id} id={id} business={business} />;
            }))
          }
        </ScrollView>
      );
    }
  }
}
export default BusinessesList;
