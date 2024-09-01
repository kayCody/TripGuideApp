import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React, {useState} from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function BookingModal({place}) {
  return (
    <View className={`absolute inset-0 z-10 flex-1 h-full w-full`}>
      <View className={`flex-1 justify-center items-center h-full w-full`}>
        <View className={`bg-white rounded-lg p-4`} style={{ width: wp('50%'), height: hp('20%') }}>
          <Text>BookingModal: {place.name}</Text>
          <TouchableOpacity className={`p-2 rounded-lg bg-[#3d8ee5]`} onPress={() => { }}>
            <Text className={`text-white`}>Book</Text>
          </TouchableOpacity>
        </View>
      </View>
      
    </View>
  )
}