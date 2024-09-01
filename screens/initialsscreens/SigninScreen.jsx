import React, { useState } from 'react'
import { SafeAreaView, View, Text, Image, TextInput, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp, heightPercentageToDP } from 'react-native-responsive-screen';
import { appleLogo, googleLogo, loginImage, signup } from '../../assets';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { signInUser } from '../../conf/supabaseDataServer';

export default function SigninScreen({navigation}) {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  //Forms
  const [emailRef, setEmailRef] = useState('');
  const [passwordRef, setPasswordRef] = useState('');

  //submit function
  //sign up submission to supabase
  const onSubmit = () => {
    // validation
    if (!emailRef || !passwordRef) {
      Alert.alert('All fields are required!');
      return;
    }
    let email = emailRef.trim();
    let password = passwordRef.trim();
    signInUser(email, password, setLoading, setEmailRef, setPasswordRef, navigation)
  }
  return (
    <SafeAreaView className="bg-white flex-1">
      <View className={`flex-row justify-center items-center p-5`}>
        <Image source={loginImage} style={{height: hp('20%'), width:wp('35%')}} />
      </View>
      <View className='px-5 space-y-4'>
        <View className='space-y-2'>
          <Text className="font-bold text-4xl">Login</Text>
          <Text className='text-gray-400'>Welcome to TripGuide Application, </Text>
        </View>
        {/* login formms */}
        <View className='space-y-4'>
          {/* scroll view */}
          <ScrollView className='space-y-4'>
            <View className='w-full'>
              <View className='flex-row justify-between items-center pb-2'>
                <Text className="text-black font-semibold">Email Address: </Text>
              </View>
              <View className='flex-row justify-between items-center border rounded-md p-3'>
                <TextInput className='' value={emailRef} onChangeText={text=> setEmailRef(text)} style={{ width: wp('80%') }} placeholder='eg: example@example.org' />
              </View>
            </View>
            <View className='w-full'>
              <View className='flex-row justify-between items-center pb-2'>
                <Text className="text-black font-semibold">Password: </Text>
                <TouchableOpacity className='' onPress={() => { }}><Text className="text-blue-400 text-xs">forget password? </Text></TouchableOpacity>
              </View>
              <View className='flex-row justify-between items-center border rounded-md p-3'>
                <TextInput className='' value={passwordRef} onChangeText={text => setPasswordRef(text)} style={{width: wp('80%')}} secureTextEntry={!showPassword} placeholder='******************' />
                <TouchableOpacity onPress={() => { setShowPassword(!showPassword) }}><Ionicons name={showPassword ? 'eye-off-outline' : 'eye'} size={18} /></TouchableOpacity>
              </View>
            </View>
          </ScrollView>
          {/*  button */}
          <View className='flex justify-center items-center space-y-4'>
            <TouchableOpacity className={`rounded-xl  bg-blue-950  p-3`} style={{ width: wp('85%') }} onPress={() =>onSubmit()}>
              <Text className="text-white font-bold  text-center">Signin</Text>
            </TouchableOpacity>
            {/* division tag */}
            <View className='w-[72]'>
              <View className='flex-row justify-center items-center gap-x-3'>
                <View className='border-b border-gray-300 w-full'></View>
                <Text className="text-gray-400 italic w-full">or sign in with</Text>
                <View className='border-b border-gray-300 w-full'></View>
              </View>
            </View>
            <TouchableOpacity className={`rounded-xl bg-gray-100  p-2`} style={{ width: wp('85%') }} onPress={() => {}}>
              <View className='flex-row items-center justify-center gap-x-2'>
                <Image source={googleLogo} className='w-5 h-5' />
                <Text className="">Continue with google</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity className={`rounded-xl bg-black  p-2`} style={{ width: wp('85%') }} onPress={() => {}}>
              <View className='flex-row items-center justify-center gap-x-2'>
                <Image source={appleLogo} className='w-5 h-5' />
                <Text className="text-white">Continue with apple</Text>
              </View>
            </TouchableOpacity>
            <View className='space-y-3'>
              <Text className=''>Don't have an account yet?</Text>
              <TouchableOpacity className={``} onPress={() => navigation.navigate('signup')}>
                <View className='flex-row items-center justify-center gap-x-2'>
                  <Text className="text-blue-400">create account / signup</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          {/* socials */}
          <View className='flex justify-center items-center pt-3'>
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
        <View className={`absolute top-50`} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text>Loading...</Text>
        </View>
      }
    </SafeAreaView>
  )
}