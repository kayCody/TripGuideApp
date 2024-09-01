import { View, Text, TouchableOpacity, TextInput, Modal, FlatList, ActivityIndicator, Alert } from 'react-native'
import React, { useState, useRef, useEffect } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import NetInfo from '@react-native-community/netinfo';
import { useAuth } from '../../constants/AuthContext';
import { supabase } from '../../conf/supabaseClient';

// Data import
import { accomodations } from '../../conf/Data';

export default function AddAccomodation({ bottomSheetRef, navigation }) {
  const { user } = useAuth();
  const inputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  

  // States //
  //forms Value State
  const [accomodationName, setAccomodationName] = useState({});
  const [checkInDate, setCheckInDate] = useState('');
  const [checkInTime, setCheckInTime] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [checkOutTime, setCheckOutTime] = useState('');
  const [address, setAddress] = useState('');
  const [mobile, setMobile] = useState('');
  const [website, setWebsite] = useState('');
  const [email, setEmail] = useState('');
  const [usersessionid, setUsersessionid] = useState(user.id || undefined);

  //Modal window
  const [isModalVisible, setModalVisible] = useState(false);
  const [isCheckInDatePickerVisible, setCheckInDatePickerVisibility] = useState(false);
  const [isCheckInTimePickerVisible, setCheckInTimePickerVisibility] = useState(false);
  const [isCheckOutDatePickerVisible, setCheckOutDatePickerVisibility] = useState(false);
  const [isCheckOutTimePickerVisible, setCheckOutTimePickerVisibility] = useState(false);
  const [queryText, setQueryText] = useState('');
  const [results, setResults] = useState([]);

  //Forms Submission to SupaBase API
  const handleSubmit = async () => {
    if (!accomodationName || !checkInDate || !checkInTime || !checkOutDate || !checkOutTime) {
      Alert.alert('Please fill out all fields marked with * red asterish.');
      return;
    }
    // Check the network status before submitting data
    const netInfo = await NetInfo.fetch();
    netInfo.statusBarIn
    if (!netInfo.isConnected || netInfo.isInternetReachable === false) {
      Alert.alert('Network connection is poor or unavailable. Please check your connection and try again.');
      return;
    }
    setLoading(true);
    // submitTripData(usersessionid, tripName, budget, destinationAddress, startDate, endDate, description);
    try {
      // Create your trip data object
      const { data: restaurants, error } = await supabase
        .from('restaurants')
        .insert([
          {
            user_id: usersessionid,  // Assuming you're storing the session info
            accomodation_name: accomodationName,
            check_in_date: checkInDate,
            check_in_time: checkInTime,
            check_out_date: checkOutDate,
            check_out_time: checkOutTime,
            address: address,
            mobile: mobile,
            website: website,
            email: email
          }
        ]);
      if (error) {
        Alert.alert('Error inserting data:', error.message)
        console.log(error.message)
      } else {
        Alert.alert('Trip created successfully and saved to Supabase!');
      }
    } catch (error) {
      Alert.alert('Unexpected error', error.message)
      console.log(error.message)
    }
    setLoading(false);

    // Reset form state of the forms
    setAccomodationName({});
    setCheckInDate('');
    setCheckInTime('');
    setCheckOutDate('');
    setCheckOutTime('');
    setAddress('');
    setMobile('');
    setWebsite('');
    setEmail('');
    //closing the buttomsheet using the sheetRef
    bottomSheetRef.current?.close();
  };

  //fetching Accomodations
  // useEffect(() => {
  //   const fetchSupabaseData = async () => {
  //     try {
  //       //fetching Trip Data
  //       const { data, error } = await supabase
  //         .from('Accomodation')
  //         // Filter by user id
  //         .select()
  //       if (error) {
  //         Alert.alert('error fetch restaurants data', error.message)
  //         console.log(error);
  //       }
  //       setAccomodations(data)
  //     } catch (error) {
  //       Alert.alert('Unexpected error was caught', error.message)
  //     }
  //   }
  //   fetchSupabaseData();
  // }, []);
  const search = accomodations
  return (
    <View className={` h-full relative`}>
      <View className={`px-5 flex-row justify-between items-center`}>
        <TouchableOpacity className onPress={() => {
          bottomSheetRef.current?.close();
          setLoading(false);
          setAccomodationName({});
          setCheckInDate('');
          setCheckInTime('');
          setCheckOutDate('');
          setCheckOutTime('');
          setAddress('');
          setMobile('');
          setWebsite('');
          setEmail('');
        }}><Text className={`text-blue-400 text-lg`}>Cancel</Text></TouchableOpacity>
        <Text className={`text-xl font-semibold`}>Add Accomodation</Text>
        <TouchableOpacity onPress={() => { handleSubmit() }}><Text className={`text-blue-400 text-lg`}>Save</Text></TouchableOpacity>
      </View>
      <View className={`px-5 py-5 space-y-4`}>
        <View className={``}>
          <Text className={``}>Accomodation name<Text className={`text-red-600`}>*</Text></Text>
          <TouchableOpacity onPress={() => { setModalVisible(true) }} className={`rounded-md  p-2 border-b `}>
            <TextInput ref={inputRef} value={accomodationName.name ? `${accomodationName.name}, ${accomodationName.city}, ${accomodationName.country}` : ''} editable={false} className={`w-full `} />
          </TouchableOpacity>
        </View>
        <View className={`flex-row gap-x-3  items-center`}>
          <View className={`w-64`}>
            <Text className={``}>Check-In-Date <Text className={`text-red-600`}>*</Text></Text>
            <TouchableOpacity onPress={() => { setCheckInDatePickerVisibility(true) }} className={`rounded-md  p-2 border-b `}>
              <TextInput value={checkInDate} editable={false} className={`w-full `} />
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={isCheckInDatePickerVisible}
              mode="date"
              onConfirm={(date) => {
                const formattedDate = date.toLocaleDateString(); // format the date as needed
                setCheckInDate(formattedDate);
                setCheckInDatePickerVisibility(false);
              }}
              onCancel={() => { setCheckInDatePickerVisibility(false) }}
            />
          </View>
          <View className={`w-20`}>
            <Text className={``}>Time<Text className={`text-red-600`}>*</Text></Text>
            <TouchableOpacity onPress={() => { setCheckInTimePickerVisibility(true) }} className={`rounded-md  p-2 border-b `}>
              <TextInput value={checkInTime} editable={false} className={`w-full `} />
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={isCheckInTimePickerVisible}
              mode="time"
              onConfirm={(time) => {
                const formattedTime = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); // format the time as needed
                setCheckInTime(formattedTime); // set the formatted time
                setCheckInTimePickerVisibility(false); // hide the picker
              }}
              onCancel={() => {
                setCheckInTimePickerVisibility(false); // hide the picker on cancel
              }}
            />
          </View>
        </View>
        <View className={`flex-row gap-x-3 items-center`}>
          <View className={`w-64`}>
            <Text className={``}>Check-Out-Date <Text className={`text-red-600`}>*</Text></Text>
            <TouchableOpacity onPress={() => { setCheckOutDatePickerVisibility(true) }} className={`rounded-md  p-2 border-b `}>
              <TextInput value={checkOutDate} editable={false} className={`w-full `} />
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={isCheckOutDatePickerVisible}
              mode="date"
              onConfirm={(date) => {
                const formattedDate = date.toLocaleDateString(); // format the date as needed
                setCheckOutDate(formattedDate);
                setCheckOutDatePickerVisibility(false);
              }}
              onCancel={() => { setCheckOutDatePickerVisibility(false) }}
            />
          </View>
          <View className={`w-20`}>
            <Text className={``}>Time<Text className={`text-red-600`}>*</Text></Text>
            <TouchableOpacity onPress={() => { setCheckOutTimePickerVisibility(true) }} className={`rounded-md  p-2 border-b `}>
              <TextInput value={checkOutTime} editable={false} className={`w-full `} />
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={isCheckOutTimePickerVisible}
              mode="time"
              onConfirm={(time) => {
                const formattedTime = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); // format the time as needed
                setCheckOutTime(formattedTime); // set the formatted time
                setCheckOutTimePickerVisibility(false); // hide the picker
              }}
              onCancel={() => {
                setCheckOutTimePickerVisibility(false); // hide the picker on cancel
              }}
            />
          </View>
        </View>
        <View className={``}>
          <Text className={``}>Address:</Text>
          <TextInput placeholder='' value={address} onChangeText={(text) => { setAddress(text) }} returnKeyType="done" className={`w-full p-2 border-b border-black`} />
        </View>
        <View className={``}>
          <Text className={``}>Phone:</Text>
          <TextInput placeholder='' value={mobile} onChangeText={(text) => { setMobile(text) }} returnKeyType="done" className={`w-full p-2 border-b border-black`} />
        </View>
        <View className={``}>
          <Text className={``}>Website:</Text>
          <TextInput placeholder='' value={website} onChangeText={(text) => { setWebsite(text) }} returnKeyType="done" className={`w-full p-2 border-b border-black`} />
        </View>
        <View className={``}>
          <Text className={``}>Email:</Text>
          <TextInput placeholder='' value={email} onChangeText={(text) => { setEmail(text) }} returnKeyType="done" className={`w-full p-2 border-b border-black`} />
        </View>
      </View>
      {/* Modal for Search */}
      <Modal visible={isModalVisible} animationType="slide">
        <View style={{ padding: 20, marginTop: 30 }}>
          <TextInput
            returnKeyType="done"
            value={queryText}
            onChangeText={(text) => {
              setQueryText(text);
              // Filter results based on the search text
              const filteredResults = search.filter(item => item.name.toLowerCase().includes(text.toLowerCase()) 
              );
              setResults(filteredResults);
            }}
            onSubmitEditing={(queryText) => {
              setAccomodationName(queryText);
            }}
            style={{ borderBottomWidth: 1, padding: 10 }}
            placeholder="Search here..."
          />
          {/* Search Results */}
          <FlatList
            data={results}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => {
                setAccomodationName(item);
                setModalVisible(false);
              }}>
                {item.name == '' ? (
                  <Text className={``}>No keyword of such matches the data in database, sorry</Text>
                ) : (
                  <View className={`border-b`}>
                    <Text style={{ paddingVertical: 4 }}>{item.name}</Text>
                    <View className={`flex-row gap-x-2`}>
                      <Text className={`text-gray-400`}>Review Counts: {item.review_count},</Text>
                      <Text className={`text-gray-400`}>{item.city},</Text>
                      <Text className={`text-gray-400`}>{item.country}</Text>
                    </View>
                  </View>
                )}
              </TouchableOpacity>
            )}
          />
          {/* CloseButton */}
          <TouchableOpacity onPress={() => setModalVisible(false)}>
            <Text style={{ textAlign: 'center', marginTop: 20 }}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      {/* loading indicator */}
      {loading &&
        <View className='absolute top-[20%] left-[50%] z-10  bg-opacity-20  flex justify-center items-center'>
          <View className={`bg-gray-100 p-2 rounded-lg  flex justify-center items-center `} style={{ height: hp('20%'), width: ('150%') }}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        </View>
      }
    </View>
  )
}