import * as React from "react";
import MapView, { Marker } from "react-native-maps";
import { Loading } from "../Loading/Loading.component";
import styles from "./Map.component.style";
class Map extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (!this.props.currentCoordinates) {
      return <Loading />;
    } else {
      return (
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
        >
          {this.props.businesses &&
            this.props.businesses.map((business, id) => {
              if (business.lat && business.lng) {
                return (
                  <Marker
                    key={id}
                    onPress={() => {
                      this.props.setOverlay(business);
                    }}
                    coordinate={{
                      latitude: business.lat,
                      longitude: business.lng,
                    }}
                    title={business.name}
                    description={business.address}
                  />
                );
              }
            })}
        </MapView>
      );
    }
  }
}

export default Map;
