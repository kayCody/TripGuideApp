import { View, Text, TouchableOpacity, TextInput, Modal, FlatList, ActivityIndicator, Alert } from 'react-native'
import React, { useState, useRef, useEffect } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import NetInfo from '@react-native-community/netinfo';
import { useAuth } from '../../constants/AuthContext';
import { supabase } from '../../conf/supabaseClient';


export default function AddRestaurants({bottomSheetRef, navigation}) {
  const { user } = useAuth();
  const inputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [restaurants, setRestaurants] = useState(null)

  // States //
  //forms Value State
  const [restaurantName, setRestaurantName] = useState({});
  const [arrivalDate, setArrivalDate] = useState('');
  const [arrivalTime, setArrivalTime] = useState('');
  const [address, setAddress] = useState('');
  const [mobile, setMobile] = useState('');
  const [website, setWebsite] = useState('');
  const [email, setEmail] = useState('');
  const [usersessionid, setUsersessionid] = useState(user.id||undefined);

  //Modal window
  const [isModalVisible, setModalVisible] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isEndDatePickerVisible, setEndDatePickerVisibility] = useState(false);
  const [queryText, setQueryText] = useState('');
  const [results, setResults] = useState([]);

  //Forms Submission to SupaBase API
  const handleSubmit = async () => {
    if (!restaurantName || !arrivalDate || !arrivalTime) {
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
      const { data:restaurants, error } = await supabase
        .from('restaurants')
        .insert([
          {
            user_id: usersessionid,  // Assuming you're storing the session info
            restaurant_name: restaurantName,
            arrival_date: arrivalDate,
            arrival_time: arrivalTime,
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
    setRestaurantName({});
    setArrivalDate('');
    setArrivalTime();
    setAddress('');
    setMobile('');
    setWebsite('');
    setEmail('');
    //closing the buttomsheet using the sheetRef
    bottomSheetRef.current?.close();
  };

  //fetching Restaurants
  useEffect(() => {
    const fetchSupabaseData = async () => {
      try {
        //fetching Trip Data
        const { data, error } = await supabase
          .from('RestaurantDataset')
          // Filter by user id
          .select()
        if (error) {
          Alert.alert('error fetch restaurants data', error.message)
          console.log(error);
        }
        setRestaurants(data)
      } catch (error) {
        Alert.alert('Unexpected error was caught', error.message)
      }
    }
    fetchSupabaseData();
  }, []);
  const search = restaurants
  return (
    <View className={` h-full relative`}>
      <View className={`px-5 flex-row justify-between items-center`}>
        <TouchableOpacity className onPress={() => {
          bottomSheetRef.current?.close();
          setLoading(false);
          setRestaurantName({});
          setArrivalDate('');
          setArrivalTime();
          setAddress('');
          setMobile('');
          setWebsite('');
          setEmail('');
        }}><Text className={`text-blue-400 text-lg`}>Cancel</Text></TouchableOpacity>
        <Text className={`text-xl font-semibold`}>Add Restaurant</Text>
        <TouchableOpacity onPress={() => { handleSubmit() }}><Text className={`text-blue-400 text-lg`}>Save</Text></TouchableOpacity>
      </View>
      <View className={`px-5 py-5 space-y-4`}>
        <View className={``}>
          <Text className={``}>Restaurant name<Text className={`text-red-600`}>*</Text></Text>
          <TouchableOpacity onPress={() => { setModalVisible(true) }} className={`rounded-md  p-2 border-b `}>
            <TextInput ref={inputRef} value={restaurantName.Name ? `${restaurantName.name}, ${restaurantName.city}, ${restaurantName.country}` : ''} editable={false} className={`w-full `} />
          </TouchableOpacity>
        </View>
        <View className={`flex-row justify-between items-center`}>
          <View className={``}>
            <Text className={``}>Start Date (format: yyyy-mm-dd)<Text className={`text-red-600`}>*</Text></Text>
            <TouchableOpacity onPress={() => { setDatePickerVisibility(true) }} className={`rounded-md  p-2 border-b `}>
              <TextInput value={arrivalDate} editable={false} className={`w-full `} />
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={(date) => {
                const formattedDate = date.toLocaleDateString(); // format the date as needed
                setArrivalDate(formattedDate);
                setDatePickerVisibility(false);
              }}
              onCancel={() => { setDatePickerVisibility(false) }}
            />
          </View>
          <View className={``}>
            <Text className={``}>End Date<Text className={`text-red-600`}>*</Text></Text>
            <TouchableOpacity onPress={() => { setEndDatePickerVisibility(true) }} className={`rounded-md  p-2 border-b `}>
              <TextInput value={arrivalTime} editable={false} className={`w-full `} />
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={isEndDatePickerVisible}
              mode="time"
              onConfirm={(time) => {
                const formattedTime = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); // format the time as needed
                setArrivalTime(formattedTime); // set the formatted time
                setEndDatePickerVisibility(false); // hide the picker
              }}
              onCancel={() => {
                setEndDatePickerVisibility(false); // hide the picker on cancel
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
              const filteredResults = search.filter(item => item.name.toLowerCase().includes(text.toLowerCase()) ||
                item.city.toLowerCase().includes(text.toLowerCase()) ||
                item.country.toLowerCase().includes(text.toLowerCase())
              );
              setResults(filteredResults);
            }}
            onSubmitEditing={(queryText) => {
              setRestaurantName(queryText);
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
                setRestaurantName(item);
                setModalVisible(false);
              }}>
                {item.name == '' ? (
                  <Text className={``}>No keyword of such matches the data in database, sorry</Text>
                ) : (
                  <View className={`border-b`}>
                      <Text style={{ paddingVertical: 4 }}>{item.name}</Text>
                      <View className={`flex-row gap-x-2`}>
                        <Text className={`text-gray-400`}>{item.blurb},</Text>
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