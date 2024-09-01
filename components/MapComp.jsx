import React from 'react'
import { View } from 'react-native';
import MapView, { Marker, } from 'react-native-maps';


export default function MapComp({ SizeStyle, placeLat, placeLong, maptype, showUserLocation, MarkerStyle, placeTitle, }) {
  return (
    <View>
      <MapView
        style={SizeStyle}
        showsUserLocation={showUserLocation}
        followsUserLocation
        showsCompass={true}
        mapType={maptype}
        rotateEnabled={true}
        initialRegion={{
          latitude: placeLat,
          longitude: placeLong,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        region={{
          latitude: placeLat,
          longitude: placeLong,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        <Marker
          coordinate={
            {
              latitude: placeLat,
              longitude: placeLong,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }
          }
          flat={false}
          style={MarkerStyle} // Rotate marker according to heading
          //title={`${placeTitle}`}
        />
        <Marker
          coordinate={
            {
              latitude: placeLat,
              longitude: placeLong,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }
          }
          image={require('../assets/icons/red-arrow.png')}
          flat={false}
          style={MarkerStyle} // Rotate marker according to heading
        //title={`${placeTitle}`}
        />
        
      </MapView>
    </View>
  )
}