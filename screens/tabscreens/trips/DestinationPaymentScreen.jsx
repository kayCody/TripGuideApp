import { View, Text, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import React from 'react'
import { mastercard, visacard } from '../../../assets';
import { useState } from 'react';
export default function DestinationPaymentScreen({route,navigation}) {
  const { trip, arrivalTime, adultCount, childCount, subtotal, grandtotal } = route.params;
  const [bookStatus, setBookStatus] = useState(false)
  const handlePayment = async() => {
    // Logic to handle payment processing
    // For now, we'll just navigate back to the previous screen
    Alert.alert('Payment Successful', 'Your payment has been processed successfully.');
    setBookStatus(true); // or you can set a flag to indicate successful booking
    await new Promise(resolve => setTimeout(resolve, 4000))
    navigation.navigate('details', {trip, bookStatus}); // or you can navigate to a confirmation screen
  };

  const [formtype, setFormType] = useState();
  const buttoms = (formtype, setFormType, image, cardtype) => {
    return (
      <TouchableOpacity className={`flex-row  gap-x-3 bg-white rounded-xl shadow-md w-full  py-4 ${formtype === cardtype ? 'border border-[#0a4983]' : ''} `} style={{width:wp('45%')}}  onPress={() => { setFormType(cardtype) }}>
        <View className='flex-row items-center  gap-x-2'>
          <Image source={image} className='w-10 h-5 rounded-md' />
          <Text className="text-[#0a4983] font-bold">{cardtype}</Text>
        </View>
        <View className={`p-2 rounded-full w-5 h-5 ${formtype === cardtype ? 'bg-[#0a4983]' : 'border border-[#0a4983]'}`}></View>
      </TouchableOpacity>
    )
  }
  return (
    <View>
      {/* Navigations */}
      <View className={`bg-blue-900 w-full  px-4`}>
        <SafeAreaView className={`flex-row justify-between items-center mt-5 px-3 `}>
          <TouchableOpacity className={`flex justify-center items-center`} onPress={() => navigation.goBack()}>
            <Ionicons name='arrow-back-outline' size={25} color='white' />
          </TouchableOpacity>
          <Text className={`text-white text-center font-semibold text-[15px] px-2`} style={{ width: wp('65%') }}>Payment, {trip.destination_address.Name}, {trip.destination_address.Location}</Text>
          <View className={`flex-row justify-center items-center gap-x-2`}></View>
        </SafeAreaView>
      </View>
      <View style={styles.container}>
        <Text style={styles.title}>Payment Summary</Text>
        <Text>Trip Distination: <Text className={`text-xl font-bold`}>{trip.destination_address.Name}, {trip.destination_address.Location}</Text> </Text>
        <View style={styles.detailsContainer}>
          <Text style={styles.detailItem}>Exstimated Arrival Time: {arrivalTime}</Text>
          <Text style={styles.detailItem}>Adults: {adultCount}</Text>
          <Text style={styles.detailItem}>Children: {childCount}</Text>
          <Text style={styles.detailItem}>Subtotal: ${subtotal.toFixed(2)}</Text>
          <Text style={styles.detailItem}>Grand Total: ${grandtotal.toFixed(2)}</Text>
        </View>
        
      </View>
      <View className={`px-5`}>
        <Text className={`text-xl font-bold`}>Select Payment Method</Text>
        <View className={`space-y-3`}>
          <View className={`space-y-2`}>
            <View className={`flex-row w-full gap-x-2`}>
              {buttoms(formtype, setFormType, visacard, 'Visa Card')}
              {buttoms(formtype, setFormType, mastercard, 'Credit Card')}
            </View>
            {/* <View className={``}>
              {formtype === 'Visa Card' && 
                <View>
                  <Text>This is Visa Forms</Text>
                </View>
              }
              {formtype === 'Credit Card' &&
                <View><Text>This is MasterCard Forms</Text></View>
              }
            </View> */}
          </View>
          <TouchableOpacity className={`bg-[#0a4983] rounded-md p-2 flex-row items-center justify-center gap-x-2 `} title="Confirm Payment" onPress={handlePayment} >
            <Ionicons name='lock-closed-sharp' size={20} color='white' />
            <Text className={`text-center text-white font-bold`}>Pay</Text></TouchableOpacity>
        </View>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {

    padding: 20,

    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  detailsContainer: {
    marginBottom: 20,
  },
  detailItem: {
    fontSize: 18,
    marginBottom: 10,
  },
});
