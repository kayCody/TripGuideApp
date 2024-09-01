import { SafeAreaView, View, Text, TextInput, StyleSheet, TouchableOpacity, Image, ScrollView, Alert } from 'react-native'
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { CustomBottomSheetModal, Payment } from '../../../components';

import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { useAuth } from '../../../constants/AuthContext';
import { supabase } from '../../../conf/supabaseClient';

// Initialize the Geocoder with your Google Maps API key

export default function PlaceAvaila({ route, navigation }) {
  const { trip } = route.params;
  // ref for BottomSheet
  const bottomSheetRef = useRef(null);

  const [isCheckInTimePickerVisible, setCheckInTimePickerVisibility] = useState(false);
  //Amount payablr Calculation
  const [arrivalTime, setArrivalTime] = useState('');
  const [adultCount, setAdultCount] = useState(1)
  const [childCount, setChildCount] = useState(0)
  const [subtotal, setSubtotal] = useState(0)
  const [grandtotal, setGrandtotal] = useState(0)

  useEffect(() => {
    // Calculate the subtotal whenever adultCount or childCount changes
    if (adultCount >= 1 || childCount >= 0) {
      const newSubtotal = (adultCount * trip.destination_address.PriceRange.adult) + (childCount * trip.destination_address.PriceRange.child);
      setSubtotal(newSubtotal);
      const tax = 10 / 100
      setGrandtotal(newSubtotal + (newSubtotal * tax));
    }
  }, [adultCount, childCount, trip.destination_address.PriceRange.adult, trip.destination_address.PriceRange.child]);

  const [currentTab, setCurrentTab] = useState('');
  // ButtomTabs

  const handleBookNow = () => {
    Alert.alert('Book buttom pressed')
    navigation.replace('details')
  }

  const renderContent = () => {
    return (
      <Payment bottomSheetRef={bottomSheetRef} arrivalTime={arrivalTime} adultCount={adultCount} childCount={childCount} grandtotal={grandtotal}  />
    )
  };

  return (
    <View className={`bg-white h-full`}>
      <View className={`relative `}>
        {/* Navigations */}
        <View className={`bg-blue-900 w-full pt-4 px-4`}>
          <SafeAreaView className={`flex-row justify-between items-center mt-5 px-3 mb-4`}>
            <TouchableOpacity className={`flex justify-center items-center`} onPress={() => navigation.goBack()}>
              <Ionicons name='arrow-back-outline' size={25} color='white' />
            </TouchableOpacity>
            <Text className={`text-white text-center font-semibold text-[15px] px-2`} style={{ width: wp('65%') }}>Book Now, {trip.destination_address.Name}, {trip.destination_address.Location}</Text>
            <View className={`flex-row justify-center items-center gap-x-2`}></View>
          </SafeAreaView>
        </View>

        {/* Body */}
        <View className={`px-5 pt-5 space-y-2 `}>
          <Text className={`text-gray-400`}>Selected Trip Destination:</Text>
          <View className={`flex-row gap-x-2 items-center`}>
            <Text className={`text-2xl font-semibold`}>{trip.destination_address.Name},</Text>
            <Text className={`text-xl `}>{trip.destination_address.Location}</Text>
          </View>
          {/* content form */}
          <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false} className={`space-y-5`} style={{ height: hp('70%') }}>
            <View className={`space-y-2 `}>
              <Text className={`text- text-gray-400`}>Schedule Trip</Text>
              <View className={`space-y-4`}>
                <View className='w-full'>
                  <View className='flex-row justify-between items-center pb-2'>
                    <Text className="text-black font-semibold">Trip Date: </Text>
                  </View>
                  <View className='flex-row justify-between items-center border rounded-md p-3'>
                    <TextInput className='' value={trip.start_date} editable={false} style={{ width: wp('80%') }} placeholder='eg: example@example.org' />
                  </View>
                </View>
                <View className='w-full'>
                  <View className='flex-row justify-between items-center pb-2'>
                    <Text className="text-black font-semibold">Estimated time of arrival </Text>
                  </View>
                  <View className='flex-row justify-between items-center border rounded-md p-3'>
                    <View className={``}>
                      <TouchableOpacity onPress={() => { setCheckInTimePickerVisibility(true) }} className={`rounded-md  p-2 border-b `}>
                        <TextInput className='' value={arrivalTime} editable={false} style={{ width: wp('80%') }} placeholder='e.g:7:47' />
                      </TouchableOpacity>
                      <DateTimePickerModal
                        isVisible={isCheckInTimePickerVisible}
                        mode="time"
                        onConfirm={(time) => {
                          const formattedTime = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); // format the time as needed
                          setArrivalTime(formattedTime); // set the formatted time
                          setCheckInTimePickerVisibility(false); // hide the picker
                        }}
                        onCancel={() => {
                          setCheckInTimePickerVisibility(false); // hide the picker on cancel
                        }}
                      />
                    </View>
                  </View>
                </View>
              </View>
            </View>
            <View className={`space-y-2 `}>
              <Text className={`text- text-gray-400`}>Place Booking</Text>
              <View className={`border border-gray-200 p-3 space-y-4`}>
                <View className={``}>
                  <Text key={trip.destination_address.AdditionalInformation.id} className={``}>{trip.destination_address.AdditionalInformation.content}</Text>
                  <Text>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laborum maiores praesentium placeat eius iusto numquam, eaque eveniet earum veniam reprehenderit impedit ex? Et nisi eius, consequuntur aspernatur velit temporibus. Culpa.</Text>
                </View>
                <View className='w-full flex-row justify-between'>
                  <View className='pb-2'>
                    <Text className="text-gray-500 ">Adult (age 18+) </Text>
                    <Text className=" ">US$ {trip.destination_address.PriceRange.adult} </Text>
                  </View>
                  <View className='flex-row justify-between items-center border rounded-md p-2' style={{ width: wp('40%') }}>
                    <TouchableOpacity className={`rounded-md p-2 flex items-center justify-center`} onPress={() => { adultCount > 1 && setAdultCount(adultCount - 1) }}>
                      <Ionicons name='remove' size={20} color='' />
                    </TouchableOpacity>
                    <TextInput keyboardType="numeric" editable={false} className='w-18 p-2' value={String(adultCount)} />
                    <TouchableOpacity className={`rounded-md p-2 flex items-center justify-center`} onPress={() => { setAdultCount(adultCount + 1) }}>
                      <Ionicons name='add-sharp' size={20} color='' />
                    </TouchableOpacity>
                  </View>
                </View>
                <View className='w-full flex-row justify-between'>
                  <View className='pb-2'>
                    <Text className="text-gray-500 ">Child (age 6 - 17) </Text>
                    <Text className=" ">US$ {trip.destination_address.PriceRange.child} </Text>
                  </View>
                  <View className='flex-row justify-between items-center border rounded-md p-2' style={{ width: wp('40%') }}>
                    <TouchableOpacity className={`rounded-md p-2 flex items-center justify-center`} onPress={() => { childCount > 0 && setChildCount(childCount - 1) }}>
                      <Ionicons name='remove' size={20} color='' />
                    </TouchableOpacity>
                    <TextInput keyboardType="numeric" className='' value={String(childCount)} />
                    <TouchableOpacity className={`rounded-md p-2 flex items-center justify-center`} onPress={() => { setChildCount(childCount + 1) }} >
                      <Ionicons name='add-sharp' size={20} color='' />
                    </TouchableOpacity>
                  </View>
                </View>
                <View className='w-full flex-row justify-between'>
                  <Text>Free for infants (0 - 5)</Text>
                </View>
              </View>
            </View>
            <View className={`space-y-2`}>
              <Text className={`font-bold`}>Amount to pay</Text>
              <View className={`pr-5 space-y-3`}>
                <View className={`flex-row justify-between`}>
                  <View>
                    <Text>Subtotal</Text>
                  </View>
                  <View><Text>${subtotal}</Text></View>
                </View>
                <View className={`flex-row justify-between`}>
                  <Text>Taxes (10%)</Text>
                </View>
                <View className={`flex-row justify-between`}>
                  <Text className={`text-xl font-bold`}>Grand Total</Text>
                  <View className={``}>
                    <Text className={`text-xl font-bold`}>US$ {grandtotal}</Text>
                  </View>
                </View>
              </View>
            </View>
            <View className={``}>
              <TouchableOpacity className={`bg-blue-950 p-3 rounded-lg`} onPress={() => navigation.navigate('payment', {
                trip, arrivalTime, adultCount, childCount, subtotal, grandtotal})}>
                <Text className={`text-white text-center text-xl`}>continue to Payment</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
          {/* BottomSheet */}
          {currentTab && <CustomBottomSheetModal bottomSheetRef={bottomSheetRef} content={renderContent} snapPointsValue='70%' enablePanDownToClose={false} />}
        </View>
      </View>
    </View>
  )
}