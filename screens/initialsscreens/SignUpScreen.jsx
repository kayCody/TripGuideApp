import { SafeAreaView, View, Text, TextInput, TouchableOpacity, Image, ScrollView, Alert, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { appleLogo, googleLogo } from '../../assets';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { signUpUser } from '../../conf/supabaseDataServer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';

export default function SignUpScreen({navigation}) {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState();
  const [isConnected, setIsConnected] = useState(true)
  //submission
  const [nameRef, setNameRef] = useState('');
  const [emailRef, setEmailRef] = useState('');
  const [passwordRef, setPasswordRef] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    // Monitor network status
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
      if (state.isConnected) {
        // Check if there's data to resend when network comes back online
        sendPendingData();
      }
    });
    return () => unsubscribe();
  }, []);
  const saveDataToAsyncStorage = async (data) => {
    try {
      const jsonValue = JSON.stringify(data);
      await AsyncStorage.setItem('@pending_signup', jsonValue);
      Alert.alert('No Network', 'Your data has been saved and will be submitted once the network is available.');
    } catch (e) {
      Alert.alert('Error', 'Failed to save data. Please try again.');
    }
  };
  const sendPendingData = async () => {
    try {
      const savedData = await AsyncStorage.getItem('@pending_signup');
      if (savedData) {
        const { name, email, password } = JSON.parse(savedData);
        await submitData({name, email, password });
        // Clear saved data after successful submission
        await AsyncStorage.removeItem('@pending_signup');
      }
    } catch (e) {
      console.log('Failed to send pending data', e);
    }
  };
  //sign up submission to supabase
  const onSubmit = async()=> {
    // validation
    if (!nameRef ||!emailRef ||!passwordRef ||!confirmPassword) {
      Alert.alert('All fields are required!');
      return;
    }
    let name = nameRef.trim();
    let email = emailRef.trim();
    let password = passwordRef.trim();
    let confirmPass = confirmPassword.trim();

    if (!name.match(/^[a-zA-Z ]+$/)) {
      Alert.alert('Full name should only contain letters and spaces!');
      return;
    }
    if (password!== confirmPass) {
      Alert.alert('Passwords do not match!');
      return;
    }
    if (!isConnected) {
      // Save data if no network
      const formData = { name, email, password };
      await saveDataToAsyncStorage(formData);
    } else {
      await signUpUser(name, email, password, setLoading, setNameRef, setEmailRef, setPasswordRef, setConfirmPassword);
    }  
  }
  return (
    <SafeAreaView className=" bg-white flex-1">
      <View className='py-20 px-5 space-y-3'>
        {/* header */}
        <View className='space-y-3'>
          <Text className="font-bold text-4xl">Create Account</Text>
          <Text className='text-gray-400'>Welcome to TripGuide Application form, </Text>
        </View>

        {/* signup formms */}
        <View className='space-y-3'>
          <ScrollView className='space-y-5' style={{height: hp('42%'), width: wp('93%') }}>
            <View className='flex-row gap-x-2'>
              {/* Name */}
              <View className='' style={{ width: wp('88%') }} >
                <View className='flex-row justify-between items-center pb-2'>
                  <Text  className="text-black font-semibold">full name: </Text>
                </View>
                <View className='flex-row justify-between items-center border rounded-md p-3'>
                  <TextInput value={nameRef} onChangeText={(text)=>{setNameRef(text)}} className='' style={{ width: wp('85%') }} placeholder='eg: Hannah' />
                </View>
              </View>
            </View>
            {/* Email */}
            <View className='' style={{ width: wp('88%') }} >
              <View className='flex-row justify-between items-center pb-2'>
                <Text className="text-black font-semibold">Email Address: </Text>
              </View>
              <View className='flex-row justify-between items-center border rounded-md p-3'>
                <TextInput value={ emailRef } onChangeText={(text) => { setEmailRef(text) }} className='' style={{ width: wp('85%') }}  placeholder='eg: example@email.com' />
              </View>
            </View>
            {/* PAssword */}
            <View className='' style={{ width: wp('88%') }} >
              <View className='flex-row justify-between items-center pb-2'>
                <Text className="text-black font-semibold">Password: </Text>
              </View>
              <View className='flex-row justify-between items-center border rounded-md p-3'>
                <TextInput value={passwordRef} onChangeText={(text) => { setPasswordRef(text) }} className='' style={{ width: wp('76%') }} secureTextEntry={!showPassword} placeholder='******************' />
                <TouchableOpacity onPress={() => { setShowPassword(!showPassword) }}><Ionicons name={showPassword ? 'eye-off' : 'eye'} size={18} /></TouchableOpacity>
              </View>
            </View>
            {/* confirm */}
            <View className='' style={{ width: wp('88%') }} >
              <View className='flex-row justify-between items-center pb-2'>
                <Text className="text-black font-semibold">Confirm Password </Text>
              </View>
              <View className='flex-row justify-between items-center border rounded-md p-3'>
                <TextInput value={confirmPassword } onChangeText={(text) => { setConfirmPassword(text) }} className='' style={{ width: wp('76%') }} secureTextEntry={!showPassword} placeholder='******************' />
                <TouchableOpacity onPress={() => { setShowPassword(!showPassword) }}><Ionicons name={showPassword ? 'eye-off' : 'eye'} size={18} /></TouchableOpacity>
              </View>
            </View>
          </ScrollView>
          {/*  button */}
          <View className='flex justify-center items-center space-y-3'>
            <TouchableOpacity className={`rounded-xl bg-blue-950  p-3`} style={{ width: wp('85%') }} onPress={()=>onSubmit()}>
              <Text className="text-white font-bold  text-center">Create Account</Text>
            </TouchableOpacity>
            {/* division tag */}
            <View className='w-[78]'>
              <View className='flex-row justify-center items-center gap-x-3'>
                <View className='border-b border-gray-300 w-full'></View>
                <Text className="text-gray-400 italic w-full">or sign up with</Text>
                <View className='border-b border-gray-300 w-full'></View>
              </View>
            </View>
            <View className='' style={{ width: wp('50%') }}>
              <View className='flex-row justify-center items-center gap-x-2'>
                <TouchableOpacity className={`rounded-xl bg-gray-100  p-2`} style={{ width: wp('41%') }} onPress={() => { }}>
                  <View className='flex-row items-center justify-center gap-x-2'>
                    <Image source={googleLogo} className='w-5 h-5' />
                    <Text className=""> Google</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity className={`rounded-xl bg-black  p-2`} style={{ width: wp('41%') }} onPress={() => { }}>
                  <View className='flex-row items-center justify-center gap-x-2'>
                    <Image source={appleLogo} className='w-5 h-5' />
                    <Text className="text-white">Apple</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <View className='space-y-3'>
              <Text className=''>Already have an account?</Text>
              <TouchableOpacity className={``} onPress={() => navigation.navigate('signin')}>
                <View className='flex-row items-center justify-center gap-x-2'>
                  <Text className="text-blue-400">click to sign in</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          {/* socials */}
          <View className='flex justify-center items-center pt-3' style={{ paddingTop: hp('1%') }}>
            <Text className='text-orange-400'>follow us on all social-media platform</Text>
            <View className='flex-row justify-center items-center gap-x-2 p-2'>
              <TouchableOpacity onPress={() => { }}><Ionicons name='logo-instagram' color='pink' size={25} /></TouchableOpacity>
              <TouchableOpacity onPress={() => { }}><Ionicons name='logo-twitter' color='black' size={25} /></TouchableOpacity>
              <TouchableOpacity onPress={() => { }}><Ionicons name='logo-facebook' color='blue' size={25} /></TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      {loading &&
        <View className={`absolute`} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text>Loading...</Text>
        </View>
      }
    </SafeAreaView>
  )
}