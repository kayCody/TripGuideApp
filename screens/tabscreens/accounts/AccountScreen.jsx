import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
import React, { useState, useRef } from 'react'
import { userImage } from '../../../assets';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { CustomBottomSheetModal } from '../../../components';
import { signOutUser } from '../../../conf/supabaseDataServer';
import { useAuth } from '../../../constants/AuthContext';
import { supabase } from '../../../conf/supabaseClient';


export default function AccounScreen({ navigation }) {
  const { user } = useAuth();
  //Ref
  const bottomSheetRef = useRef(null);
  const [lineTabs, setLineTabs] = useState(false);
  const [bottomTitles, setBottomTitles] = useState('');
  const [snapPoints, setSnapPoints] = useState('')

  const [accountHolder, setAccountHolder] = useState(user);
  // Rendering of tabs
  const NavButtom = (lineTabs, setLineTabs, title, icons, navLink, snapPoint) => {
    return (
      <TouchableOpacity className={`flex-row justify-between items-center px-2 p-3  ${lineTabs === title ? '' : ''}`} onPress={() => {
        if (title === 'View Profile information') {
          navigation.navigate(`${navLink}`)
        } else {
          setLineTabs(true);
          setBottomTitles(title);
          setSnapPoints(snapPoint);
        }
      }}>
        <View className={`flex-row gap-x-2 items-center`}>
          <Ionicons name={icons} size={20} color='black' />
          <Text className={`text-sm text-black `}>{title}</Text>
        </View>
      </TouchableOpacity>
    )
  }
  const renderContent = () => {
    switch (bottomTitles) {
      case 'Check payment type / Add card':
        return (
          <View className={``}>
            {/* NavButtoms */}
            <View className={`px-5 flex-row justify-between items-center`}>
              <TouchableOpacity className onPress={() => {
                bottomSheetRef.current?.close();
                setLineTabs(false);
              }}><Text className={`text-blue-600 text-lg`}>Cancel</Text></TouchableOpacity>
              <Text className={`text-xl font-semibold`}>{bottomTitles}</Text>
              <TouchableOpacity className onPress={() => {
                //bottomSheetRef.current?.close();
                alert('trip created succefully, and saved, press "ok" to continue');
              }}><Text className={`text-blue-600 text-lg`}>Save</Text></TouchableOpacity>
            </View>
            {/* content */}
            <View className={``}></View>
          </View>
        );
      case 'Subscriptions':
        return (
          <View className={``}>
            {/* NavButtoms */}
            <View className={`px-5 flex-row justify-between items-center`}>
              <TouchableOpacity className onPress={() => {
                bottomSheetRef.current?.close();
                setLineTabs(false);
              }}><Text className={`text-blue-600 text-lg`}>Cancel</Text></TouchableOpacity>
              <Text className={`text-xl font-semibold`}>{bottomTitles}</Text>
              <TouchableOpacity className onPress={() => {
                //bottomSheetRef.current?.close();
                alert('trip created succefully, and saved, press "ok" to continue');
              }}><Text className={`text-blue-600 text-lg`}>Save</Text></TouchableOpacity>
            </View>
            {/* content */}
            <View className={``}></View>
          </View>
        );
      case 'Language':
        return (
          <View className={``}>
            {/* NavButtoms */}
            <View className={`px-5 flex-row justify-between items-center`}>
              <TouchableOpacity className onPress={() => {
                bottomSheetRef.current?.close();
                setLineTabs(false);
              }}><Text className={`text-blue-600 text-lg`}>Cancel</Text></TouchableOpacity>
              <Text className={`text-xl font-semibold`}>{bottomTitles}</Text>
              <TouchableOpacity className onPress={() => {
                //bottomSheetRef.current?.close();
                alert('trip created succefully, and saved, press "ok" to continue');
              }}><Text className={`text-blue-600 text-lg`}>Save</Text></TouchableOpacity>
            </View>
            {/* content */}
            <View className={``}></View>
          </View>
        );
      case 'Country':
        return (
          <View className={``}>
            {/* NavButtoms */}
            <View className={`px-5 flex-row justify-between items-center`}>
              <TouchableOpacity className onPress={() => {
                bottomSheetRef.current?.close();
                setLineTabs(false);
              }}><Text className={`text-blue-600 text-lg`}>Cancel</Text></TouchableOpacity>
              <Text className={`text-xl font-semibold`}>{bottomTitles}</Text>
              <TouchableOpacity className onPress={() => {
                //bottomSheetRef.current?.close();
                alert('trip created succefully, and saved, press "ok" to continue');
              }}><Text className={`text-blue-600 text-lg`}>Save</Text></TouchableOpacity>
            </View>
            {/* content */}
            <View className={``}></View>
          </View>
        );
      case 'Currency':
        return (
          <View className={``}>
            {/* NavButtoms */}
            <View className={`px-5 flex-row justify-between items-center`}>
              <TouchableOpacity className onPress={() => {
                bottomSheetRef.current?.close();
                setLineTabs(false);
              }}><Text className={`text-blue-600 text-lg`}>Cancel</Text></TouchableOpacity>
              <Text className={`text-xl font-semibold`}>{bottomTitles}</Text>
              <TouchableOpacity className onPress={() => {
                //bottomSheetRef.current?.close();
                alert('trip created succefully, and saved, press "ok" to continue');
              }}><Text className={`text-blue-600 text-lg`}>Save</Text></TouchableOpacity>
            </View>
            {/* content */}
            <View className={``}></View>
          </View>
        );
      case 'Get help':
        return (
          <View className={``}>
            {/* NavButtoms */}
            <View className={`px-5 flex-row justify-between items-center`}>
              <TouchableOpacity className onPress={() => {
                bottomSheetRef.current?.close();
                setLineTabs(false);
              }}><Text className={`text-blue-600 text-lg`}>Cancel</Text></TouchableOpacity>
              <Text className={`text-xl font-semibold`}>{bottomTitles}</Text>
              <TouchableOpacity className onPress={() => {
                //bottomSheetRef.current?.close();
                alert('trip created succefully, and saved, press "ok" to continue');
              }}><Text className={`text-blue-600 text-lg`}>Save</Text></TouchableOpacity>
            </View>
            {/* content */}
            <View className={``}></View>
          </View>
        );
      case 'Give Feedback':
        return (
          <View className={``}>
            {/* NavButtoms */}
            <View className={`px-5 flex-row justify-between items-center`}>
              <TouchableOpacity className onPress={() => {
                bottomSheetRef.current?.close();
                setLineTabs(false);
              }}><Text className={`text-blue-600 text-lg`}>Cancel</Text></TouchableOpacity>
              <Text className={`text-xl font-semibold`}>{bottomTitles}</Text>
              <TouchableOpacity className onPress={() => {
                //bottomSheetRef.current?.close();
                alert('trip created succefully, and saved, press "ok" to continue');
              }}><Text className={`text-blue-600 text-lg`}>Save</Text></TouchableOpacity>
            </View>
            {/* content */}
            <View className={``}></View>
          </View>
        );
      case 'Make a Complaint':
        return (
          <View className={``}>
            {/* NavButtoms */}
            <View className={`px-5 flex-row justify-between items-center`}>
              <TouchableOpacity className onPress={() => {
                bottomSheetRef.current?.close();
                setLineTabs(false);
              }}><Text className={`text-blue-600 text-lg`}>Cancel</Text></TouchableOpacity>
              <Text className={`text-xl font-semibold`}>{bottomTitles}</Text>
              <TouchableOpacity className onPress={() => {
                //bottomSheetRef.current?.close();
                alert('trip created succefully, and saved, press "ok" to continue');
              }}><Text className={`text-blue-600 text-lg`}>Save</Text></TouchableOpacity>
            </View>
            {/* content */}
            <View className={``}></View>
          </View>
        );
      case 'Emergency Response (Mayday Mayday)':
        return (
          <View className={``}>
            {/* NavButtoms */}
            <View className={`px-5 flex-row justify-between items-center`}>
              <TouchableOpacity className onPress={() => {
                bottomSheetRef.current?.close();
                setLineTabs(false);
              }}><Text className={`text-blue-600 text-lg`}>Cancel</Text></TouchableOpacity>
              <Text className={`text-xl font-semibold`}>{bottomTitles}</Text>
              <TouchableOpacity className onPress={() => {
                //bottomSheetRef.current?.close();
                alert('trip created succefully, and saved, press "ok" to continue');
              }}><Text className={`text-blue-600 text-lg`}>Save</Text></TouchableOpacity>
            </View>
            {/* content */}
            <View className={``}></View>
          </View>
        );
      case 'Terms of Service':
        return (
          <View className={``}>
            {/* NavButtoms */}
            <View className={`px-5 flex-row justify-between items-center`}>
              <TouchableOpacity className onPress={() => {
                bottomSheetRef.current?.close();
                setLineTabs(false);
              }}><Text className={`text-blue-600 text-lg`}>Cancel</Text></TouchableOpacity>
              <Text className={`text-xl font-semibold`}>{bottomTitles}</Text>
              <TouchableOpacity className onPress={() => {
                //bottomSheetRef.current?.close();
                alert('trip created succefully, and saved, press "ok" to continue');
              }}><Text className={`text-blue-600 text-lg`}>Save</Text></TouchableOpacity>
            </View>
            {/* content */}
            <View className={``}></View>
          </View>
        );
      case 'Privacy and Data Policy':
        return (
          <View className={``}>
            {/* NavButtoms */}
            <View className={`px-5 flex-row justify-between items-center`}>
              <TouchableOpacity className onPress={() => {
                bottomSheetRef.current?.close();
                setLineTabs(false);
              }}><Text className={`text-blue-600 text-lg`}>Cancel</Text></TouchableOpacity>
              <Text className={`text-xl font-semibold`}>{bottomTitles}</Text>
              <TouchableOpacity className onPress={() => {
                //bottomSheetRef.current?.close();
                alert('trip created succefully, and saved, press "ok" to continue');
              }}><Text className={`text-blue-600 text-lg`}>Save</Text></TouchableOpacity>
            </View>
            {/* content */}
            <View className={``}></View>
          </View>
        );
    }
  }
  return (
    <View className={`w-full h-full `}>
      <View className={`relative w-full`}>
        {/* Top section */}
        <View className={`bg-[#0a4983] px-5 py-3 pt-14 w-full space-y-2 flex- justify-start items-start`} >
          <Image source={userImage} className={`rounded-full w-14 h-14 border-2 border-white`} />
          <View className={``}>
            <Text className={`text-white font-semibold text-2xl shadow-lg`}>{accountHolder.name}</Text>
            <Text className={`text-white font-semibold text-2xl shadow-lg`}>{accountHolder.email}</Text>
            <TouchableOpacity className={`flex justify-center items-start`} onPress={() => signOutUser(navigation)}>
              <Text className={`text-sm text-red-500`}>Logout account</Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* Body section */}
        <View className={``}>
          <ScrollView className={`space-y-5 px-4 py-5 pb-5`} style={{ height: hp('70%') }} >
            {/* personal information */}
            <View className={`space-y-3`}>
              <Text className={`text-gray-400`}>Personal Information</Text>
              <View className={`rounded-lg  bg-white divide-y divide-gray-200 p-2`}>
                <View className={`flex-row justify-between items-center pr-4`}>
                  {NavButtom(lineTabs, setLineTabs, 'View Profile information', 'person-outline', 'profile-info')}
                  <Ionicons name='arrow-forward-sharp' size={20} />
                </View>
              </View>
            </View>
            {/* Payment */}
            <View className={`space-y-3`}>
              <Text className={`text-gray-400`}>Payment Details / Credit Card </Text>
              <View className={`rounded-lg bg-white divide-y divide-gray-200 p-2`}>
                <View className={`flex-row justify-between items-center pr-4`}>
                  {NavButtom(lineTabs, setLineTabs, 'Check payment type / Add card', 'card', '', '70%')}
                  <Ionicons name='arrow-forward-sharp' size={20} />
                </View>
                <View className={`flex-row justify-between items-center pr-4`}>
                  {NavButtom(lineTabs, setLineTabs, 'Subscriptions', 'cash-outline', '', '90%')}
                  <Ionicons name='arrow-forward-sharp' size={20} />
                </View>
              </View>
            </View>
            {/* settings */}
            <View className={`space-y-3`}>
              <Text className={`text-gray-400`}>Settings</Text>
              <View className={`rounded-lg  bg-white divide-y divide-gray-200 p-2`}>
                <View className={`flex-row justify-between items-center pr-4`}>
                  {NavButtom(lineTabs, setLineTabs, 'Language', 'language-sharp', '', '30%')}
                  <View className={`flex-row justify-center items-center gap-x-2`}>
                    <Text className={`text-gray-400`}>English</Text>
                    <Ionicons name='arrow-forward-sharp' size={20} />
                  </View>
                </View>
                <View className={`flex-row justify-between items-center pr-4`}>
                  {NavButtom(lineTabs, setLineTabs, 'Country', 'globe-outline', '', '30%')}
                  <View className={`flex-row justify-center items-center gap-x-2`}>
                    <Text className={`text-gray-400`}>Ghana (GH)</Text>
                    <Ionicons name='arrow-forward-sharp' size={20} />
                  </View>
                </View>
                <View className={`flex-row justify-between items-center pr-4`}>
                  {NavButtom(lineTabs, setLineTabs, 'Currency', 'cash-sharp', '', '30%')}
                  <View className={`flex-row justify-center items-center gap-x-2`}>
                    <Text className={`text-gray-400`}>USD</Text>
                    <Ionicons name='arrow-forward-sharp' size={20} />
                  </View>
                </View>
              </View>
            </View>
            {/* Support System */}
            <View className={`space-y-3`}>
              <Text className={`text-gray-400`}>Support</Text>
              <View className={`rounded-lg  bg-white divide-y divide-gray-200 p-2`}>
                <View className={`flex-row justify-between items-center pr-4`}>
                  {NavButtom(lineTabs, setLineTabs, 'Get help', 'help-circle-outline', '', '90%')}
                  <Ionicons name='arrow-forward-sharp' size={20} />
                </View>
                <View className={`flex-row justify-between items-center pr-4`}>
                  {NavButtom(lineTabs, setLineTabs, 'Give Feedback', 'chatbubble-ellipses-outline', '', '90%')}
                  <Ionicons name='arrow-forward-sharp' size={20} />
                </View>
                <View className={`flex-row justify-between items-center pr-4`}>
                  {NavButtom(lineTabs, setLineTabs, 'Make a Complaint', 'chatbox-outline', '', '90%')}
                  <Ionicons name='arrow-forward-sharp' size={20} />
                </View>
                <View className={`flex-row justify-between items-center pr-4`}>
                  {NavButtom(lineTabs, setLineTabs, 'Emergency Response (Mayday Mayday)', 'help-buoy-outline', '', '90%')}
                  <Ionicons name='arrow-forward-sharp' size={20} />
                </View>
              </View>
            </View>
            {/* Legal Service / Policies */}
            <View className={`space-y-3`}>
              <Text className={`text-gray-400`}>Legal</Text>
              <View className={`rounded-lg  bg-white divide-y divide-gray-200 p-2`}>
                <View className={`flex-row justify-between items-center pr-4`}>
                  {NavButtom(lineTabs, setLineTabs, 'Terms of Service', 'business-outline', '', '90%')}
                  <Ionicons name='arrow-forward-sharp' size={20} />
                </View>
                <View className={`flex-row justify-between items-center pr-4`}>
                  {NavButtom(lineTabs, setLineTabs, 'Privacy and Data Policy', 'shield-checkmark-sharp', '', '90%')}
                  <Ionicons name='arrow-forward-sharp' size={20} />
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
      {/* BottomSheetModal */}
      {lineTabs && <CustomBottomSheetModal bottomSheetRef={bottomSheetRef} content={renderContent()} snapPointsValue={snapPoints} enablePanDownToClose={false} />}
    </View>
  )
}
