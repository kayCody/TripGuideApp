import { View, Text, TouchableOpacity, ScrollView, Image, Alert} from 'react-native'
import React, { useRef, useState } from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { CustomBottomSheetModal,AddRestaurantsForm, AddAccommodationsForm, AddFlightsForm, ExpenseCal } from '../../../components';
import { useAuth } from '../../../constants/AuthContext';
import { supabase } from '../../../conf/supabaseClient';

export default function TripDetailScreen({ route, navigation }) {
  const { trip, bookStatus } = route.params;
  const { user } = useAuth();

  //Ref
  const bottomSheetRef = useRef(null);
  const [currentTab, setCurrentTab] = useState('');
  const [cal, setCal] = useState(false);
  const [check, checking] = useState(bookStatus);
  // ButtomTabs
  const AddTabs = (currentTab, setCurrentTab, title, icon) => {
    return (
      <TouchableOpacity className={`p-2 flex justify-center items-center ${currentTab === title && 'border-b'}`} onPress={() => {
        setCurrentTab(title)
        bottomSheetRef.current?.expand();
      }}>
        < Ionicons name={icon} size={20} color='#3434c3' />
        <Text className={`${currentTab === title ? 'text-[#3434c3]' : 'text-gray-400'}`}>{title}</Text>
      </TouchableOpacity>
    )
  }
  // Rednering
  const expenseCal = () => {
    const budget = trip.budget;
    return (
      <ExpenseCal bottomSheetRef={bottomSheetRef} budget={budget} setCal={setCal} />
    )
  }
  const renderContent = () => {
    switch (currentTab) {
      case 'Accomodation':
        return (
          < AddAccommodationsForm bottomSheetRef={bottomSheetRef} />
        )
      case 'Restaurants':
        return (
          < AddRestaurantsForm bottomSheetRef={bottomSheetRef} />
        )
      case 'Tour Guide':
        return (
          <View>
            <Text>Tour Guide Content</Text>
          </View>
        )
      case 'Flight':
        return (
          < AddFlightsForm bottomSheetRef={bottomSheetRef} />
        )
      default:
        return <Text>Default Content</Text>
    }
  }
  return (
    <View className={`flex bg-white h-full px-5 relatiive`}>
      <View className={`flex-row justify-between items-center pt-14  pb-3 border-b border-gray-300 w-full`}>
        <TouchableOpacity className={`flex justify-center items-center`} onPress={() => navigation.goBack()}>
          <Ionicons name='arrow-back-outline' size={25} color='black' />
        </TouchableOpacity>
        <Text className={`font-semibold text-[15px] text-center px-2 uppercase`} style={{ width: wp('65%') }}>Trip Detail Page</Text>
        <View className={`flex-row justify-center items-center gap-x-4`}>
          <TouchableOpacity className={`flex justify-center items-center`} onPress={() => { }}>
            <Ionicons name='share-outline' size={25} color='black' />
          </TouchableOpacity>
          <TouchableOpacity className={`flex justify-center items-center`} onPress={ async() => {
            const { data, error } = await supabase
              .from('trips')
              .delete()
              .eq('user_id', user.id)
              .eq('id', trip.id);  // assuming you have the trip's ID

            if (error) {
              Alert.alert('Error deleting trip:', error);
              console.error('Error deleting trip:', error);
            } else {
              Alert.alert('Trip deleted successfully');
              navigation.pop(); // go back to previous screen
              console.log('Trip deleted successfully:', data);
            }

           }}>
            <Ionicons name='trash-outline' size={25} color='red' />
          </TouchableOpacity>
        </View>
      </View>
      <View className={``} style={{ paddingTop: hp('2%'), paddingBottom: hp('5%') }}>
        <View className={`pb-5 space-y-2`}>
          <View className={`flex-row justify-between gap-x-2`}>
            <View>
              <Text className={`text-2xl font-bold uppercase w-44`}>{trip.trip_name}</Text>
              <Text className={`text-sm font-semibold`}>Date: {trip.start_date} - {trip.end_date}</Text>
            </View>
            <Image source={trip.destination_address.PlaceImage[0]} className={`rounded-xl shadow-lg p-2`} style={{ height: hp('10%'), width: wp('40%') }} />
          </View>
          <View className={``}>
            <Text className={`text-xl font-bold uppercase`}>Trip Budget: USD${trip.budget}</Text>
            <TouchableOpacity className={``} onPress={()=>setCal(true)}>
              <Text className={`text-blue-600`}>Show Expense Budget Calculator</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        <ScrollView className={`space-y-6`} style={{ paddingTop: hp('1%'), height:hp('80%') }}>
          <View className={`space-y-2`}>
            <Text className={`p-2 bg-gray-200 w-full font-bold`}>Trip Description</Text>
            <Text className={``}>{trip.description}</Text>
          </View>
          <View className={`space-y-2`}>
            <Text className={`p-2 bg-gray-200 w-full font-bold`}>Destintion</Text>
            <View key={trip.destination_address.id} className={`relative flex-row gap-x-3 mr-2`}>
              <View className='absolute top-0 right-0  p-2 '>
                <View className='rounded-full w-8 h-8 flex items-center justify-center bg-gray-500 bg-opacity-5'>
                  <TouchableOpacity><Ionicons name='heart-outline' size={20} color='white' /></TouchableOpacity>
                </View>
              </View>
              <View className=''>
                <Text className='text-lg font-semibold'>{trip.destination_address.Name}</Text>
                <View className='flex-row items-center'>
                  <Ionicons name='location' size={15} color='red' />
                  <Text className='text-sm text-gray-400'>{trip.destination_address.Location}</Text>
                </View>
                <Text className='text-sm text-gray-400'>Status: <Text className={`${check===true?'text-green-500':'text-red-500'}`}>{check===true ? 'Booked':'Not Booked yet' }</Text></Text>
                <TouchableOpacity className={`pt-3`} onPress={() => { navigation.navigate('destination-detail', { trip, bookStatus }) }}>
                  <Text className={`text-blue-600`}>Book this destination >></Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View className={``}>
            <Text className={`p-2 bg-gray-200 w-full font-bold`}>Additional Services of Interest (add-ons)</Text>
            <View className={`flex-row justify-center items-center`}>
              <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{ width: wp('95%') }} contentContainerStyle={{ alignItems: 'center' }} >
                {AddTabs(currentTab, setCurrentTab, 'Accomodation', 'home')}
                {AddTabs(currentTab, setCurrentTab, 'Restaurants', 'fast-food')}
                {AddTabs(currentTab, setCurrentTab, 'Tour Guide', 'code-working')}
                {AddTabs(currentTab, setCurrentTab, 'Flight', 'car-sharp')}
              </ScrollView>
            </View>
          </View>

          {/* Accomodation */}
          {/* {UserAccomodation > 0 &&
            <View className={`space-y-2`}>
              <Text className={`p-2 bg-gray-200 w-full`}>Accomodation</Text>
              <Text className={``}>{ UserAccomodation.accomodation_name }</Text>
              <View className={`flex-row gap-x-2`}>
                <Text className={``}>{UserAccomodation.check_in_date}</Text>
                <Text className={``}>{UserAccomodation.check_in_time}</Text>
              </View>
              <View className={`flex-row gap-x-2`}>
                <Text className={``}>{UserAccomodation.check_out_date}</Text>
                <Text className={``}>{UserAccomodation.check_out_time}</Text>
              </View>
              <Text className={``}>{trip.description}</Text>
            </View>
          } */}

        </ScrollView>
      </View>
      <View className={``}>
        <TouchableOpacity className={``}><Ionicons name=''/></TouchableOpacity>
      </View>
      {cal && <CustomBottomSheetModal bottomSheetRef={bottomSheetRef} content={expenseCal()} snapPointsValue='50%' enablePanDownToClose={false} />}
      {currentTab && <CustomBottomSheetModal bottomSheetRef={bottomSheetRef} content={renderContent()} snapPointsValue='90%' enablePanDownToClose={true} />}
    </View>
  )
}