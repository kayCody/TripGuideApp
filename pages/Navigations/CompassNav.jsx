import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { Magnetometer, Accelerometer } from 'expo-sensors';
import * as Location from 'expo-location';

export default function CompassNav() {
  const [magnetometerData, setMagnetometerData] = useState(null);
  const [accelerometerData, setAccelerometerData] = useState(null);
  const [locationData, setLocationData] = useState(null);
  const rotation = new Animated.Value(0);

  useEffect(() => {
    // Magnetometer for orientation
    const magnetometerSubscription = Magnetometer.addListener((data) => {
      setMagnetometerData(data);
      const angle = calculateAngle(data);
      Animated.timing(rotation, {
        toValue: angle,
        duration: 100,
        useNativeDriver: true,
      }).start();
    });

    Magnetometer.setUpdateInterval(100);

    // Accelerometer for elevation angle
    const accelerometerSubscription = Accelerometer.addListener((data) => {
      setAccelerometerData(data);
    });

    Accelerometer.setUpdateInterval(100);

    // Location for altitude
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocationData(location);
    })();

    return () => {
      magnetometerSubscription.remove();
      accelerometerSubscription.remove();
    };
  }, []);

  const calculateAngle = (data) => {
    let { x, y } = data;
    let angle = Math.atan2(y, x) * (180 / Math.PI);
    angle = angle >= 0 ? angle : angle + 360;
    return angle;
  };

  const calculateElevationAngle = (data) => {
    let { z } = data;
    let angle = Math.acos(z) * (180 / Math.PI);
    return angle;
  };

  const rotate = rotation.interpolate({
    inputRange: [0, 360],
    outputRange: ['0deg', '360deg'],
  });
  return (
    <View style={styles.container}>
      <Animated.View style={{ transform: [{ rotate }] }}>
        <Text style={styles.compassText}>📍</Text>
      </Animated.View>
      {magnetometerData && (
        <Text style={styles.text}>Orientation: {Math.round(rotation._value)}°</Text>
      )}
      {accelerometerData && (
        <Text style={styles.text}>
          Elevation: {Math.round(calculateElevationAngle(accelerometerData))}°
        </Text>
      )}
      {locationData && (
        <Text style={styles.text}>Altitude: {Math.round(locationData.coords.altitude)} m</Text>
      )}
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  compassText: {
    fontSize: 100,
  },
  text: {
    fontSize: 18,
    marginTop: 20,
  },
});