import { supabase, session } from "./supabaseClient";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import NetInfo from '@react-native-community/netinfo';



/* User of the APP*/
//users signup
export const signUpUser = async (name, email, password,setLoading, setNameRef, setEmailRef, setPasswordRef, setConfirmPassword, navigation) => {
  try {
    //supabase 
    setLoading(true);
    const { data: { session }, error } = await supabase.auth.signUp({
      name,
      email,
      password
    });
    setLoading(false);
    if (error) {
      Alert.alert('Error signing up: ', error.message);
      return;
    }
    //reseting the forms
    setNameRef('');
    setEmailRef('');
    setPasswordRef('');
    setConfirmPassword('');
    // Show success alert with navigation
    Alert.alert(
      'Account Created',
      'Account created successfully! You can now log in.',
    );
    // console log and navigate
    console.log('Submitting data:', name, email, password);
  } catch (error) {
    Alert.alert('Unexpected Error', error.message);
  }
};
//users Login
export const signInUser = async (email, password, setLoading, setEmailRef, setPasswordRef, navigation) => {
  try {
    // Check network connection
    const netInfo = await NetInfo.fetch();
    if (!netInfo.isConnected) {
      Alert.alert('No Internet Connection', 'Please check your internet connection and try again.');
      return;
    }
    //supabase 
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 3000));
    const {  error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    setLoading(false);
    if (error) {
      Alert.alert('Error signing in: ', error.message);
      return;
    }
    // session = await supabase.auth.getUser(token);
    // // Store the session token securely
    // await AsyncStorage.setItem('userToken', session.access_token);
    //reseting the forms
    setEmailRef('');
    setPasswordRef('');
    // Show success alert with navigation
    Alert.alert(
      'Account Signed in successfully!'
    );
    // console log and navigate
    navigation.replace('bottomTab');
    console.log('Submitting data:', email, password);
  } catch (error) {
    Alert.alert('Unexpected Error', error.message);
  }
};
export const signOutUser = async () => {
  try {
    // Check network connection
    const netInfo = await NetInfo.fetch();
    if (!netInfo.isConnected) {
      Alert.alert('No Internet Connection', 'Please check your internet connection and try again.');
      return;
    }
    
    Alert.alert(
      'User signed out',
      'Are you sure you want to sign out?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: async () => { await supabase.auth.signOut(); },
        },
      ]
    )
  } catch (error) {
    console.error('Error signing out:', error.message);
    // Handle error
  }
};



/*Trips */
//TripsPosting to Supabase */
export const submitTripData = async (usersessionid, tripName, budget, destinationAddress, startDate, endDate, description) => {
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
      Alert.alert('Trip added successfully')
    }
  } catch (error) {
    Alert.alert('Unexpected error', error.message)
    console.log(error.message)
  }
};
//Tirips Data Fetching
export const fetchUserTrip = async () => {
  try {
    const { data, error } = await supabase
      .from('UserTrip') // Replace with your table name
      .select('*');
    if (error) {
      throw error;
    }
    setData(data);
  } catch (error) {
    console.error('Error fetching data:', error);
  } finally {
    setLoading(false);
  }
};
//Trips Data Deleting
const deleteTrip = async (tripId) => {
  try {
    const { data, error } = await supabase
      .from('trips') // Replace 'trips' with your actual table name
      .delete()
      .eq('id', tripId);

    if (error) {
      throw error;
    }

    console.log('Trip deleted successfully:', data);
    alert('Trip deleted successfully!');
  } catch (error) {
    console.error('Error deleting trip:', error.message);
    alert('Failed to delete trip. Please try again later.');
  }
};