import * as React from "react";
import MapView, { Marker } from "react-native-maps";

export default function Map(props) {
  return (
    <MapView
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
        latitudeDelta: 0.922,
        longitudeDelta: 0.421,
      }}
    >
      {props.markers.map((marker) => {
        return (
          <Marker
            coordinate={{
              latitude: marker.lat,
              longitude: marker.lng,
            }}
            title={marker.name}
            description={marker.place_id}
          />
        );
      })}
    </MapView>
  );
}
