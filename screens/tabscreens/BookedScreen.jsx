import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Ionicons from'react-native-vector-icons/Ionicons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function BookedScreen() {
  const [tabs, setTabs] = useState('Active')
  const ButtomTabs = (tabs, setTabs, name) => {
    return (
      <TouchableOpacity className={`${tabs === name? 'p-2 rounded-lg border border-blue-700 bg-blue-200':''} `} onPress={()=>{setTabs(name)}}>
        <Text className={`${tabs === name ? 'text-blue-600' : ''}`}>{ name }</Text>
      </TouchableOpacity>
    )
  }
  return (
    <View className={`bg-white h-full`}>
      {/* Navigations */}
      <View className={`bg-blue-900 w-full py-2`}>
        <View className={`flex-row justify-between items-center pt-10 px-3 mb-3`}>
          <TouchableOpacity className={`flex justify-center items-center`} onPress={() => navigation.goBack()}>
            <Ionicons name='arrow-back-outline' size={25} color='white' />
          </TouchableOpacity>
          <Text className={`text-white font-semibold text-[15px] px-2`} style={{ width: wp('65%') }}>Bookings</Text>
          <View className={`flex-row justify-center items-center gap-x-2`}>
            <TouchableOpacity className={`flex justify-center items-center`} onPress={() => { }}>
              <Ionicons name='heart-outline' size={25} color='white' />
            </TouchableOpacity>
            <TouchableOpacity className={`flex justify-center items-center`} onPress={() => { }}>
              <Ionicons name='share-outline' size={25} color='white' />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {/* Body */}
      <View className={`px-3 py-2`}>
        <View className="flex-row items-center gap-x-5">
          {ButtomTabs(tabs, setTabs, 'Active')}
          {ButtomTabs(tabs, setTabs, 'Past')}
          {ButtomTabs(tabs, setTabs, 'Cancelled')}
        </View>
        <View className={`p-3`}>
          <View className={``}>
            {tabs === 'Active' && (
              <View className={``}>
                <Text className={``}>Active Booking</Text>
                <View className={``}>
                  {Bookings.date < currentDate ? (
                    Bookings.map(book => {
                      <View className={``}></View>
                    })
                  ) :
                    <View className={`flex justify-center items-center space-y-4`}>
                      <Ionicons name='map' size={50} color='' />
                      <View className={``}>
                        <Text className={`text-xl font-bold`}>No active bookings yet</Text>
                      </View>
                    </View>
                  }
                </View>
              </View>
            )}
          </View>
          <View className={``}>
            {tabs === 'Past' && (
              <View className={``}>
                <Text className={``}>Past Booking</Text>
                <View className={``}>
                  {Bookings.date > currentDate ? (
                    Bookings.map(book => {
                      <View className={``}></View>
                    })
                  ) :
                    <View className={`flex justify-center items-center space-y-4`}>
                      <Ionicons name='map' size={50} color='' />
                      <View className={``}>
                        <Text className={`text-xl font-bold`}>No Past bookings</Text>
                      </View>
                    </View>
                  }
                </View>
              </View>
            )}
          </View>
          <View className={``}>
            {tabs === 'Cancelled' && (
              <View className={``}>
                <Text className={``}>Cancelled Bookingse</Text>
                <View className={``}>
                  {Bookings.date < currentDate ? (
                    Bookings.map(book => {
                      <View className={``}></View>
                    })
                  ) :
                    <View className={`flex justify-center items-center space-y-4`}>
                      <Ionicons name='map' size={50} color='' />
                      <View className={``}>
                        <Text className={`text-xl font-bold`}>No cancelled bookings yet</Text>
                      </View>
                    </View>
                  }
                </View>
              </View>
            )}
          </View>
        </View>
      </View>
    </View>
  )
}