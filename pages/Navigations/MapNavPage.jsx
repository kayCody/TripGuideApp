import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import BottomSheet, { BottomSheetView, BottomSheetBackdrop, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import Ionicons from 'react-native-vector-icons/Ionicons';
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react'
import * as Location from 'expo-location';
import { Magnetometer } from 'expo-sensors';

import { Map } from '../../components'


export default function MapNavPage({navigation}) {
  const snapPoints = useMemo(() => ['25', '35', '70'], []);
  // ref
  const bottomSheetRef = useRef(null);
  // Custom backdrop component
  const renderBackdrop = (props) => (
    <BottomSheetBackdrop {...props} opacity={0.5} disappearsOnIndex={-1} appearsOnIndex={0} />
  );
  //Bottomsheet Visibility
  const [bottomSheetVisibility, setBottomSheetVisibility] = useState(null);
  const Navbuttom = (bottomSheetVisibility, setBottomSheetVisibility, iconName, ButtomIndex) => {
    return (
      <TouchableOpacity className={`flex justify-center items-center rounded-lg bg-white p-2`} onPress={() => { setBottomSheetVisibility(0), alert(`${ButtomIndex} is press`) }}>
        <Ionicons name={iconName} size={25} color='black' />
      </TouchableOpacity>
    )
  }
  
  
  //MapType
  const [maptype, setMapType] = useState('standard')
  //Location & Magnetometer heading
  const [location, setLocation] = useState(null);
  const [heading, setHeading] = useState(0);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission to access location was denied');
        return;
      }

      let loc = await Location.getCurrentPositionAsync({});
      setLocation(loc.coords);

      Magnetometer.addListener((data) => {
        let { x, y, z } = data;
        let angle = Math.atan2(y, x) * (180 / Math.PI);
        setHeading(angle);
      });
    })();

    return () => {
      Magnetometer.removeAllListeners();
    };
  }, []);

  if (!location) {
    return (
      <View className={`flex justify-center items-center h-full`}>
        <Text>Loading....</Text>
      </View>
    )
  }

  return (
    <View className={`flex-1 h-full  bg-white`}>
      <View className={`relative`}>
        {/* Map */}
        <Map SizeStyle={{ width: wp('100%'), height: hp('100%'), borderRadius: 1 }} placeLat={location.latitude} placeLong={location.longitude} maptype={maptype} showUserLocation={false} MarkerStyle={{ transform: [{ rotate: `${heading}deg` }], width: wp('1%'), height: hp('1%') }} placeTitle='my location' />
        {/* Navigations-buttons on map */}
        <View className={`absolute top-12 px-5`}>
          <View className={`flex-row`}>
            <View className={``}>
              <TouchableOpacity className={`flex justify-center items-center rounded-lg bg-white p-2`} onPress={() => navigation.goBack()}>
                <Ionicons name='arrow-back-outline' size={25} color='black' />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View className={`absolute bottom-[55px] right-2 px-5`}>
          <View className={`flex-row  gap-x-[250px]`}>
            <View className={`space-y-3`}>
              {Navbuttom(bottomSheetVisibility, setBottomSheetVisibility, 'search', 0)}
              {Navbuttom(bottomSheetVisibility, setBottomSheetVisibility, 'layers-sharp', 1)}
            </View>
          </View>
        </View>
      </View>
      {/* Bottom Sheet */}
      {bottomSheetVisibility &&
        (
          <BottomSheet
            index={1}
            ref={bottomSheetRef}
            snapPoints={snapPoints}
            backdropComponent={renderBackdrop}
            enablePanDownToClose={true}
            enabledGestureInteraction={true}
            handleIndicatorStyle={{ width: wp('30%') }}
          >
            {bottomSheetVisibility === 0 &&
              <View style={{ padding: 20 }}>
                <Text className={`pb-3 font-bold`}>Search for destination</Text>
                {/* Additional content for the bottom sheet */}
                <View className={`py-2`}>
                  <View className={``} style={{ height: hp('34%') }}>
                    
                  </View>
                </View>
              </View>
            }
            {bottomSheetVisibility === 1 &&
              <View style={{ padding: 20 }}>
                <Text className={`text-lg font-bold`}>Restaurants</Text>
                {/* Additional content for the bottom sheet */}
                <View className={``}></View>
              </View>
            }
          </BottomSheet>
        )
      }
    </View>
  )
}

