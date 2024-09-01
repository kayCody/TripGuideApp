import { View, Text } from 'react-native'
import React,{route} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRoute } from '@react-navigation/native'

export default function NotificationDetailed({route, navigation}) {
  const { notification } = route.params;
  return (
    <SafeAreaView>
      <Text>{notification.title}</Text>
    </SafeAreaView>
  )
}