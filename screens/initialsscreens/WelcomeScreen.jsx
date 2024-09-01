import React, { useState } from 'react'
import { View, Text, ImageBackground, TouchableOpacity} from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { welcomeImage } from '../../assets';

export default function WelcomeScreen({navigation}) {
  return (
    <View className={`relative h-full`}>
      <ImageBackground source={welcomeImage} className={`flex-1`} style={{width:wp('100%')}}>
        <View className={`absolute bottom-16  px-6`}>
          {/* Middle section */}
          <View className=''>
            <View className={``}>
              <Text className={`text-2xl text-white text-start`}>Welcome to </Text>
              <Text className="text-6xl font-bold  text-blue-800">TripGuide</Text>
            </View>
          </View>
          <View className={`flex  pt-1 space-y-2`}>
            <Text className={` text-white text-xl`}>A highly advanced and competitive with modernized features mobile application for travel lovers</Text>
            <Text className={` text-gray-400`}>Explore breathtakingdestinations, find hidden jams and plan unforgettable journies, that will live with you forever, make good and enjoyable memories with loved ones and whole lot more.</Text>
          </View>
          {/* Lower Section */}
          <View className={`w-full flex items-end justify-center`} style={{ paddingTop: hp('2%') }}>
            <TouchableOpacity className={`rounded-xl  bg-blue-900 items-center justify-center p-3`} style={{ width: wp('40%') }} onPress={() => navigation.navigate("signin")}>
              <Text className="text-white font-bold text-center">Get Started</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  )
}