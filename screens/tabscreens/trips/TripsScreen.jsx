import { View, Text, TouchableOpacity, TextInput, ScrollView, Image, Modal, FlatList, Alert } from 'react-native'
import React, { useState, useRef, useEffect } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { CustomBottomSheetModal, CreateTripForm } from '../../../components';
import { globe, wavy } from '../../../assets';
import { useAuth } from '../../../constants/AuthContext';
import { supabase } from '../../../conf/supabaseClient';
// Data import
import { UserTrips, WorldTouristPlaces } from '../../../conf/Data';

export default function TripsScreen({ navigation }) {
  const { user } = useAuth();
  const [accountUser, setAccountUser] = useState(user);
  const [trips, setTrips] = useState(null);
  /* GLOBALS VARIABLES */
  //UseRefs
  const bottomSheetRef = useRef(null);

  // States//
  const [buttomPressed, setBottomPressed] = useState(false)
  
  //tabs
  const [currentTab, setCurrentTab] = useState('All');
  const tripTabs = (currentTab, setCurrentTab, title) => {
    return (
      <TouchableOpacity className={`px-2 flex justify-center items-center ${currentTab === title && ''}`} onPress={() => { setCurrentTab(title) }}>
        <Text className={`${currentTab === title ? 'text-[#000000] font-bold' : 'text-gray-400'} text-`}>{title}</Text>
      </TouchableOpacity>
    )
  }

  //contentRender
  const renderContent = () => {
    const searchDestinations = WorldTouristPlaces; // search through Destinations
    return (
      <CreateTripForm bottomSheetRef={bottomSheetRef} searchDestinations={ searchDestinations } UserTrips={UserTrips} />
    )
  }
  useEffect(() => {
    const fetchTripData = async () => {
      try {
        //fetching Trip Data
        const { data, error } = await supabase
          .from('trips')
          // Filter by user id
          .select()
          .eq('user_id', user.id)
          // Sort by start date
          .order('created_at', { descending: true })
        if (error) {
          Alert.alert('error fetch Trip data', error.message)
          console.log(error);
        }
        setTrips(data)
      } catch (error) {
        Alert.alert('Unexpected error was caught', error.message)
      }
    }
    fetchTripData();
    // Set up an interval to fetch data periodically (e.g., every 30 seconds)
    const intervalId = setInterval(() => {
      fetchTripData();
    }, 3000); // 30000ms = 30 seconds

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [accountUser.id]);

  return (
    <View className={`flex-1 h-full bg-white relative`}>
      {/* Top Navigations */}
      <View className="">
        <View className={`px-5 pt-16 w-full `}>
          <View className={`flex-row justify-end items-center `}>
            <Text className={`font-bold`}>{accountUser.name}</Text>
            <Text className={`font-bold`}>{accountUser.email}</Text>
            <TouchableOpacity className={``} onPress={() => { alert('Referesh Successful') }}>
              <Ionicons name='ellipsis-horizontal-circle' size={30} color='' />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {/* Content Body */}
      <View className={``}>
        <View className={``}>
          {/* Trips Header */}
          <View className={`px-3 mt-10 pb-2 space-y-2`}>
            <Text className={`text-3xl font-bold`}>Trips</Text>
            <View className=''>
              {trips ? (<View className={`flex-row items-center gap-x-1 bg-gray-200 rounded-lg`}>
                <Ionicons name='search' size={20} color='black' />
                <TextInput placeholder='search here e.g.: places, location, tourist site etc...' className={`w-ful p-2 rounded-lg`} />
              </View>):('')}
            </View>
          </View>
          {trips && trips.length > 0 ? (
            <View className={` px-3`}>
              {/* pressables button */}
              <ScrollView horizontal={true} style={{ width: wp('95%') }} className='py-3'>
                {tripTabs(currentTab, setCurrentTab, 'All')}
                {tripTabs(currentTab, setCurrentTab, 'Upcoming')}
                {tripTabs(currentTab, setCurrentTab, 'Completed')}
              </ScrollView>
              {/* Trip List */}
              <View className={``}>
                <ScrollView className={`space-y-2`} style={{height:hp(`70%`)}}>
                  {currentTab === 'All' &&
                    trips.map((trip) =>
                      <View key={trip.id} className={`w-full`}>
                        <TouchableOpacity className={`border border-[#0a4983] rounded-lg p-2 relative`} onPress={() => { navigation.navigate('details', { trip }) }}>
                          <View className={`flex-row gap-x-2`}>
                            <View className={`w-[80] h-[70] overflow-hidden bg-orange-500`}>
                              <Image source={{ uri: `https://gh.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/66/284019/1.jpg?7687` }} style={{ width: '100%', height: '100%' }} />
                            </View>
                            <View className={`flex-1 space-y-3`}>
                              <View className={``}>
                                <Text className={`text-xl font-bold`}>{trip.trip_name}</Text>
                                <Text className={`text-gray-500`}>{trip.start_date} - {trip.end_date}</Text>
                              </View>
                              <View className={`flex-row items-center gap-x-2`}>
                                <Ionicons name='time-outline' size={18} color='gray' />
                              </View>
                            </View>
                          </View>
                        </TouchableOpacity>
                      </View>
                  )}
                </ScrollView>
              </View>
            </View>
          ) : (
            <View className={`space-y-3 relative`} style={{ height: hp('78%') }}>
              {/* Image */}
              <View className={`flex justify-center items-center mt-2`}>
                <Image source={globe} style={{ width: wp('50'), height: hp('20%') }} width={20} />
                <Text className={`font-bold text-xl`}>No Trips scheduled yet</Text>
              </View>
              <View className={`px-5`}>
                <Text className={`text-gray-500 text-center`}>
                  Create a trip by selecting a destination, specifying dates and adding activities.
                </Text>
                <Text className={`text-gray-500 mt-5 text-xl`}>
                  Need help choosing a destination?
                </Text>
                  <TouchableOpacity className={`bg-[#0a4983] mt-2 p-3 rounded-lg`} onPress={() => navigation.navigate('destination')}>
                  <Text className={`text-white text-center`}>
                    Browse through our finest list of Destination
                  </Text>
                </TouchableOpacity>
                
              </View>
            </View>
          )}
        </View>
      </View>
      {/* Floating Action Button */}
      <View className={``}>
        {/* Footer */}
        <View className={`absolute bottom-0 `}>
          <Image source={wavy} style={{ width: wp('100%'), height: hp('20%') }} />
        </View>
        <View className={`absolute bottom-[16vh] right-5`}>
          <TouchableOpacity className={`rounded-full bg-[#0a4983] p-2 flex justify-center items-center`} onPress={() => {
            setBottomPressed(true); bottomSheetRef.current?.expand();
          }}>
            <Ionicons name='add' size={40} color='white' />
          </TouchableOpacity>
        </View>
      </View>
      {/* BottomSheet */}
      {buttomPressed && <CustomBottomSheetModal bottomSheetRef={bottomSheetRef} content={renderContent()} snapPointsValue='90%' />}
    </View>
  )
}

