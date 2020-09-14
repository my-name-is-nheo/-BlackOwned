import * as React from "react";
import MapView, { Marker } from "react-native-maps";
import Colors from "../constants/Colors";

export default function Map(props) {
  return (
    <MapView
      zoomControlEnabled
      showsUserLocation
      zoomEnabled
      loadingEnabled
      provider="google"
      style={{
        position: "relative",
        top: 0,
        left: 0,
        height: "100%",
        width: "100%",
      }}
      initialRegion={{
        latitude: props.currentCoordinates.latitude,
        longitude: props.currentCoordinates.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
    >
      {props.markers.map((marker, i) => {
        return (
          <Marker
            key={i}
            onPress={() => {
              props.setOverlay(marker);
            }}
            coordinate={{
              latitude: marker.lat,
              longitude: marker.lng,
            }}
            title={marker.name}
            description={marker.address}
          />
        );
      })}
      <Marker
        onPress={props.setOverlay}
        coordinate={{
          latitude: props.currentCoordinates.latitude,
          longitude: props.currentCoordinates.longitude,
        }}
        pinColor={"blue"}
        title={"current location"}
        description={"current location"}
      />
    </MapView>
  );
}
