import * as React from "react";
import MapView, { Marker } from "react-native-maps";
import { Loading } from "../Loading/Loading.component";
import styles from "./Map.component.style";
import { View } from "react-native";
import { Button } from "react-native-elements";

class Map extends React.Component {
  constructor(props) {
    super(props);
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (!nextProps.currentCoordinates) {
      return false;
    } else {
      /* this.mapView.animateToRegion({
        latitude: this.props.currentCoordinates.latitude,
        longitude: this.props.currentCoordinates.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }); */
      return true;
    }
  }
  render() {
    if (!this.props.currentCoordinates) {
      return <Loading />;
    } else {
      return (
        <View style={styles.container}>
          <MapView
            zoomControlEnabled
            showsUserLocation
            zoomEnabled
            loadingEnabled
            provider="google"
            style={styles.mapContainer}
            initialRegion={{
              latitude: this.props.currentCoordinates.latitude,
              longitude: this.props.currentCoordinates.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            ref={(ref) => (this.mapView = ref)}
          >
            {this.props.businesses &&
              this.props.businesses.map((business, id) => {
                if (business.geometry !== undefined) {
                }
                if (business.geometry) {
                  return (
                    <Marker
                      key={id}
                      onPress={() => {
                        this.props.setOverlay(business);
                      }}
                      coordinate={{
                        latitude: business.geometry.location.lat,
                        longitude: business.geometry.location.lng,
                      }}
                      title={business.name}
                      description={business.formatted_address}
                    />
                  );
                }
              })}
            <Marker
              coordinate={{
                latitude: this.props.currentCoordinates.latitude,
                longitude: this.props.currentCoordinates.longitude,
              }}
              pinColor={"blue"}
              title={"current location"}
            />
          </MapView>
          <Button
            // icon={{ name: "code" }}
            backgroundColor="#03A9F4"
            fontFamily="Lato"
            buttonStyle={styles.refreshButton}
            onPress={() => {}}
            title="Search in this area"
          />
        </View>
      );
    }
  }
}

export default Map;
