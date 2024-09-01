import { View, Text, TouchableOpacity, Image,ScrollView } from 'react-native'
import React, { useState } from 'react'
import { wavy } from '../../../assets';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Notifications } from '../../../conf/Data';

export default function NotificationScreen({navigation}) {
  const [messageOpened, setMessageOpened] = useState(false)
  return (
    <View className={`flex-1 h-full relative bg-white`}>
      <View className="mt-16">
        {/* Navigation */}
        <View className={`px-5 flex-row justify-between items-center border-b`}>
          <Text className={`font-bold text-xl py-2`}>Notifications & Updates</Text>
          <TouchableOpacity className={`flex-row items-center gap-x-1`}>
            <Ionicons name='filter-circle-outline' size={20} color='' />
            <Text className={`text-lg`}>Filter</Text>
          </TouchableOpacity>
        </View>
        {/* Content */}
        <View className={`px-5`}>
          {/* Notifications */}
          <View className={``}>
            {
              Notifications.length > 0 ? (
                <ScrollView className={`divide-y divide-gray-200`} style={{height: hp('80%')}}>
                  {
                    Notifications.map((notification) => (
                      <View key={notification.id} className={`flex-row items-center gap-x-2`}>
                        <View className={``}>
                          {
                            messageOpened ==='true' ?
                              <View className={`rounded-full border border-[#636464] p-2`}></View> : <View className={`rounded-full border border-[#0a4983] p-2`}></View>
                          }
                        </View>
                        <TouchableOpacity  className={`mb-2`} onPress={() => {
                          setMessageOpened(true)
                          navigation.navigate('alert-detail', {notification})
                        }}>
                          <View className={`flex-row justify-between items-center py-2 w-full pr-10`}>
                            <Text>{notification.title}</Text>
                            <Text className={`text-gray-500`}>{notification.date}</Text>
                          </View>
                          <Text className={``}>{notification.content}</Text>
                        </TouchableOpacity>
                      </View>
                    ))                  
                  }
                </ScrollView>
              ) : (
                <View className={`flex justify-center items-center pt-5`}>
                  <Text>No notifications updated or posted</Text>  
                </View>
              )
            }
          </View>
        </View>
      </View>
      {/* Footer */}
      <View className={`absolute bottom-0 `}>
        <Image source={wavy} style={{ width: wp('100%'), height: hp('20%') }} />
      </View>
    </View>
  )
}