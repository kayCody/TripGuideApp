import { View, Text, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import React, { useState, useEffect, useRef } from 'react';
import * as Location from 'expo-location';
import { Magnetometer } from 'expo-sensors';
import { CustomBottomSheetModal } from '../../../components'; // Ensure this import is correct
import { MapComponent } from '../../../components';
export default function NavigationScreen({route, navigation }) {
  const { trip } = route.params;

  // Ref for BottomSheetModal
  const bottomSheetRef = useRef(null);
  // State for BottomSheetModal visibility
  const [bottomSheetVisibility, setBottomSheetVisibility] = useState(false);
  const [buttomIndex, setButtomIndex] = useState(1); // default map type index
  const [snapPoints, setSnapPoints] = useState('50%');
  // State for MapType
  const [maptype, setMapType] = useState('hybrid');
  // State for Location and Heading
  const [location, setLocation] = useState(null);
  const [heading, setHeading] = useState(0);

  useEffect(() => {
    // Function to request location permission and get current location
    const fetchLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission to access location was denied');
        return;
      }

      let loc = await Location.getCurrentPositionAsync({});
      setLocation(loc.coords);
    };

    fetchLocation();

    // Magnetometer listener
    const subscription = Magnetometer.addListener((data) => {
      let { x, y } = data;
      let angle = Math.atan2(y, x) * (180 / Math.PI);
      setHeading(angle);
    });

    return () => {
      // Cleanup the magnetometer listener
      subscription.remove();
    };
  }, []);

  // Button Component
  const Navbuttom = (iconName, ButtomTypePressed, snapPoint) => (
    <TouchableOpacity
      style={{ justifyContent: 'center', alignItems: 'center', borderRadius: 8, backgroundColor: 'white', padding: 8 }}
      onPress={() => {
        if (ButtomTypePressed === 0) {
          setBottomSheetVisibility(true);
          setSnapPoints(snapPoint);
          setButtomIndex(ButtomTypePressed);
        } else {
          setMapType(ButtomTypePressed === 1 ? 'standard' : ButtomTypePressed === 2 ? 'satellite' : 'hybrid');
          setButtomIndex(ButtomTypePressed);
        }
      }}
    >
      <Ionicons name={iconName} size={25} color={buttomIndex === ButtomTypePressed ? '#0a4983' : 'black'} />
    </TouchableOpacity>
  );
  // Render Content for BottomSheetModal
  const renderContent = () => {
    switch (buttomIndex) {
      case 0:
        return (
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Text>BottomSheet</Text>
          </View>
        );
      case 1:
        return (
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Text>Map</Text>
          </View>
        );
      default:
        return (
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Text>Default</Text>
          </View>
        );
    }
  };
  if (!location) {
    return (
      <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
        <Text>Loading....</Text>
      </View>
    );
  }
  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <MapComponent SizeStyle={{ width: wp('100%'), height: hp('100%'), borderRadius: 1 }} placeLat={location.latitude} placeLong={location.longitude} maptype={maptype} showUserLocation={false} MarkerStyle={{ transform: [{ rotate: `${heading}deg` }], width: wp('1%'), height: hp('1%') }} placeTitle='my location' />
      {/* Navigations-buttons on map */}
      <View style={{ position: 'absolute', top: 20, paddingHorizontal: 16, width: '100%' }}>
        <View className={`flex-row justify-between mt-10`}>
          <TouchableOpacity className={`p-2 `} onPress={() => navigation.goBack()}>
            <Ionicons name='arrow-back-outline' size={25} color='white' />
          </TouchableOpacity>
          <Text className={`font-bold text-white text-2xl border-b border-white`}>{trip.destination_address.Name}</Text>
          <View style={{ alignItems: 'center' }}>
            {Navbuttom('search', 0, '90%')}
            <View style={{ borderRadius: 8, height: 160, padding: 8 }}>
              {Navbuttom('map-sharp', 1)}
              {Navbuttom('planet-sharp', 2)}
              {Navbuttom('earth', 3)}
            </View>
          </View>
        </View>
      </View>
      {/* BottomSheet Modal */}
      {bottomSheetVisibility && (
        <CustomBottomSheetModal
          bottomSheetRef={bottomSheetRef}
          content={renderContent()}
          snapPointsValue={snapPoints}
          enablePanDownToClose={true}
        />
      )}
    </View>
  );
}
