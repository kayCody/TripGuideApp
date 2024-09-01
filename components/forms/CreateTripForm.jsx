import { View, Text, TouchableOpacity, TextInput, Modal, FlatList, ActivityIndicator, Alert } from 'react-native'
import React, {useState, useRef} from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import NetInfo from '@react-native-community/netinfo';
import { useAuth } from '../../constants/AuthContext';
import { supabase } from '../../conf/supabaseClient';

//Fucntions and component imports

export default function CreateTripForm({bottomSheetRef, searchDestinations, UserTrips}) {
  const { user } = useAuth();
  const inputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  // States //
  //forms Value State
  const [tripName, setTripName] = useState('');
  const [budget, setButget] = useState('');
  const [destinationAddress, setDestinationAddress] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [description, setDescription] = useState('');
  const [usersessionid, setUsersessionid] = useState(user.id||undefined);
  
  //Modal window
  const [isModalVisible, setModalVisible] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isEndDatePickerVisible, setEndDatePickerVisibility] = useState(false);
  const [queryText, setQueryText] = useState('');
  const [results, setResults] = useState([]);
  
  //Forms Submission to SupaBase API

  const handleSubmitTrip = async () => {
    if (!tripName || !budget || !destinationAddress || !startDate || !endDate) {
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
      const { data: trips, error } = await supabase
        .from('trips')
        .insert([
          {
            user_id: usersessionid,  // Assuming you're storing the session info
            trip_name: tripName,
            budget: budget,
            destination_address: destinationAddress,
            start_date: startDate,
            end_date: endDate,
            description: description,
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
    setTripName('');
    setButget('');
    setDestinationAddress({});
    setStartDate('');
    setEndDate('');
    setDescription('');
    //closing the buttomsheet using the sheetRef
    bottomSheetRef.current?.close();
  };
  return (
    <View className={` h-full relative`}>
      <View className={`px-5 flex-row justify-between items-center`}>
        <TouchableOpacity className onPress={() => {
          bottomSheetRef.current?.close();
          setLoading(false);
          setTripName('');
          setButget('')
          setDestinationAddress({});
          setStartDate('');
          setEndDate('');
          setDescription('');
        }}><Text className={`text-blue-400 text-lg`}>Cancel</Text></TouchableOpacity>
        <Text className={`text-xl font-semibold`}>Create your Trip</Text>
        <TouchableOpacity  onPress={() => { handleSubmitTrip() }}><Text className={`text-blue-400 text-lg`}>Save</Text></TouchableOpacity>
      </View>
      <View className={`px-5 py-5 space-y-4`}>
        <View className={``}>
          <Text className={``}>Trip Name<Text className={`text-red-600`}>*</Text></Text>
          <TextInput placeholder='' value={tripName} onChangeText={(text) => { setTripName(text) }} returnKeyType="done" className={`w-full p-2 border-b border-black`} />
        </View>
        <View className={``}>
          <Text className={``}>Budget for the trip in (USD$) <Text className={`text-red-600`}>*</Text></Text>
          <TextInput placeholder='' keyboardType='numeric' value={budget} onChangeText={(text) => { setButget(text) }} returnKeyType="done" className={`w-full p-2 border-b border-black`} />
        </View>
        <View className={``}>
          <Text className={``}>Destination<Text className={`text-red-600`}>*</Text></Text>
          <TouchableOpacity onPress={() => { setModalVisible(true) }} className={`rounded-md  p-2 border-b `}>
            <TextInput ref={inputRef} value={destinationAddress.Name ? `${destinationAddress.Name}, ${destinationAddress.Location}` : ''} editable={false} className={`w-full `} />
          </TouchableOpacity>
        </View>
        <View className={``}>
          <Text className={``}>Start Date (format: yyyy-mm-dd)<Text className={`text-red-600`}>*</Text></Text>
          <TouchableOpacity onPress={() => { setDatePickerVisibility(true) }} className={`rounded-md  p-2 border-b `}>
            <TextInput value={startDate} editable={false} className={`w-full `} />
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={(date) => {
              const formattedDate = date.toLocaleDateString(); // format the date as needed
              setStartDate(formattedDate);
              setDatePickerVisibility(false);
            }}
            onCancel={() => { setDatePickerVisibility(false) }}
          />
        </View>
        <View className={``}>
          <Text className={``}>End Date<Text className={`text-red-600`}>*</Text></Text>
          <TouchableOpacity onPress={() => { setEndDatePickerVisibility(true) }} className={`rounded-md  p-2 border-b `}>
            <TextInput value={endDate} editable={false} className={`w-full `} />
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={isEndDatePickerVisible}
            mode="date"
            onConfirm={(date) => {
              const formattedDate = date.toLocaleDateString(); // format the date as needed
              setEndDate(formattedDate);
              setEndDatePickerVisibility(false);
            }}
            onCancel={() => { setDatePickerVisibility(false) }}
          />
        </View>
        <View className={``}>
          <Text className={``}>Brief Description:</Text>
          <TextInput placeholder='' value={description} onChangeText={(text) => { setDescription(text) }} returnKeyType="done" className={`w-full p-2 border-b border-black`} />
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
              const filteredResults = searchDestinations.filter(item => item.Name.toLowerCase().includes(text.toLowerCase()) ||
                item.Location.toLowerCase().includes(text.toLowerCase()) ||
                item.Description.toLowerCase().includes(text.toLowerCase())
              );
              setResults(filteredResults);
            }}
            onSubmitEditing={(queryText) => {
              setDestinationAddress(queryText);
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
                setDestinationAddress(item);
                setModalVisible(false);
              }}>
                {item.name == '' ? (
                  <Text className={``}>No keyword of such matches the data in database, sorry</Text>
                ) : (
                  <Text style={{ padding: 10 }}>{item.Name}, {item.Location}, Rating: {item.Rating}</Text>
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