import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { MapComponent } from '../../../components';


export default function DestinationDetailScreen({ route, navigation }) {
  const { trip, bookStatus } = route.params;
  const [carouselCurrentTab, setCarouselCurrentTab] = useState(1)
  const [AboutTab, setAboutTab] = useState(null)
  return (
    <View className={`bg-gray-100 relative`}>
      {/* Navigations */}
      <View className={`bg-blue-900 w-full py-2`}>
        <View className={`flex-row justify-between items-center pt-10 px-3 mb-3`}>
          <TouchableOpacity className={`flex justify-center items-center`} onPress={() => navigation.goBack()}>
            <Ionicons name='arrow-back-outline' size={25} color='white' />
          </TouchableOpacity>
          <Text className={`text-white font-semibold text-[15px] px-2`} style={{ width: wp('65%') }}>{trip.destination_address.Name}, {trip.destination_address.Location}</Text>
          <View className={`flex-row justify-center items-center gap-x-2`}>
            <TouchableOpacity className={`flex justify-center items-center`} onPress={() => { }}>
              <Ionicons name='heart-outline' size={25} color='white' />
            </TouchableOpacity>
            <TouchableOpacity className={`flex justify-center items-center`} onPress={() => { }}>
              <Ionicons name='share-outline' size={25} color='white' />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Content */}
      <View className={`bg-gray-100 relative`} >
        <ScrollView className={``} style={{ height: hp('80%') }}>
          <View className={``}>
            <Image source={trip.destination_address.PlaceImage[0]} style={{ height: hp('35%') }} className={``} />
          </View>
          {/* Carousel Bottoms */}
          <View className={`absolute top-[190px] w-full p-2 rounded-md`}>
            <View className={`flex-row justify-center items-center p-2 space-x-3`}>
              {carouselButtons(carouselCurrentTab, setCarouselCurrentTab, 1)}
              {carouselButtons(carouselCurrentTab, setCarouselCurrentTab, 2)}
              {carouselButtons(carouselCurrentTab, setCarouselCurrentTab, 3)}
              {carouselButtons(carouselCurrentTab, setCarouselCurrentTab, 4)}
              {carouselButtons(carouselCurrentTab, setCarouselCurrentTab, 5)}
            </View>
          </View>
          {/* body / details of Places */}
          <View className={`px-3 space-y-3 py-2`}>
            <View className={`bg-blue-900 p-2 flex justify-center items-center`} style={{ width: wp('45%') }}><Text className={`text-white`}>BestSeller in {trip.destination_address.Name}</Text></View>
            <View className={``}>
              <Text className={`text-2xl`}>{trip.destination_address.Name}</Text>
              <View className={`flex-row items-center gap-x-2 `}>
                <Ionicons name='location-sharp' size={15} color='#cc0000' />
                <View className={``}>
                  <Text className={`text-lg text-gray-400`}>{trip.destination_address.Location}</Text>
                </View>
              </View>
              <Text className={`text-gray-400 text-lg`}>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Suscipit veritatis ea.</Text>
            </View>
            <View className={`flex-row gap-x-2`}>
              <Ionicons name='star-sharp' size={20} color='orange' />
              <View className={`space-y-2`}>
                <Text className={`text-lg`}>{trip.destination_address.Rating} (432 reviews)</Text>
                <TouchableOpacity onPress={() => { }} className={``}><Text className={`text-blue-400 font-semibold`}>See reviews</Text></TouchableOpacity>
              </View>
            </View>
            <View className={`flex-row gap-x-2`}>
              <Ionicons name='checkmark-sharp' size={20} color='green' />
              <View className={``}>
                <Text className={`text-lg text-green-600`}>Free cancellation available</Text>
              </View>
            </View>
            <View className={`flex-row gap-x-3 items-center font-semibold`}>
              <Ionicons name='bicycle-outline' size={30} color='black' />
              <Text>Skip the line</Text>
            </View>

            {/* others and essental information  provided */}
            <View className={'mt-2'}>
              <View className={`flex-row justify-between items-center`}>
                <Text className={`font-semibold text-xl`}>Map</Text>
                <TouchableOpacity className={``}><Text className={`text-blue-400`} onPress={() => { navigation.navigate('navigation', { trip }) }}>Get Full & Detailed Map view</Text></TouchableOpacity>
              </View>
              <View className={``}>
                <MapComponent SizeStyle={{ width: wp('95%'), height: hp('20%'), borderRadius: 15 }} placeLat={trip.destination_address.Coordinates.latitude} placeLong={trip.destination_address.Coordinates.longitude} maptype='standard' />
              </View>
            </View>
            <View className={`pt-2`}>
              <Text className={`font-semibold text-xl`}>Description</Text>
              <View className={`space-y-2`}>
                <Text className={`text-gray-500 text-base`}>{trip.destination_address.Description}</Text>
                <TouchableOpacity className={``} onPress={() => { }}><Text className={`text-blue-400 font-semibold`}>Read More</Text></TouchableOpacity>
              </View>
            </View>
            <View className={`pt-2`}>
              <Text className={`font-semibold text-xl`}>Cost of expenses</Text>
              <View className={`space-y-2`}>
                <Text className={`text-gray-500 text-base`}>{trip.destination_address.CostOfExpenses}</Text>
              </View>
            </View>
            <View className={`pt-2`}>
              <Text className={`font-semibold text-xl`}>Why Visit here</Text>
              <View className={`space-y-2`}>
                {trip.destination_address.WhyVisit.map(item => (
                  <View key={item.id} className={`flex-row gap-x-2 leading-2`}>
                    <Ionicons name='checkmark-sharp' size={20} color='green' />
                    <View className={``}>
                      <Text className={`text-gray-500 text-base`}>{item.content}</Text>
                    </View>
                  </View>
                ))}
                {trip.destination_address.WhyVisit.length > 3 &&
                  <TouchableOpacity className={``}><Text className={`text-blue-400 font-semibold`}>See reviews</Text></TouchableOpacity>
                }
              </View>
            </View>
            <View className={`pt-2`}>
              <Text className={`font-semibold text-xl`}>What's included</Text>
              <View className={`space-y-2`}>
                {trip.destination_address.WhatsIncluded.map(item => (
                  <View key={item.id} className={`flex-row gap-x-2 leading-2`}>
                    <Ionicons name='checkmark-sharp' size={20} color='green' />
                    <View className={``}>
                      <Text className={`text-gray-500 text-base`}>{item.content}</Text>
                    </View>
                  </View>
                ))}
                {trip.destination_address.WhatsIncluded.length > 3 &&
                  <TouchableOpacity className={``}><Text className={`text-blue-400 font-semibold`}>See reviews</Text></TouchableOpacity>
                }
              </View>
            </View>
            <View className={`pt-2`}>
              <Text className={`font-semibold text-xl`}>What's Not included</Text>
              <View className={`space-y-2`}>
                {trip.destination_address.WhatsNotIncluded.map(item => (
                  <View key={item.id} className={`flex-row gap-x-2 leading-2`}>
                    <Ionicons name='checkmark-sharp' size={20} color='green' />
                    <View className={``}>
                      <Text className={`text-gray-500 text-base`}>{item.content}</Text>
                    </View>
                  </View>
                ))}
                {trip.destination_address.WhatsNotIncluded.length > 3 &&
                  <TouchableOpacity className={``}><Text className={`text-blue-400 font-semibold`}>See reviews</Text></TouchableOpacity>
                }
              </View>
            </View>
            {!bookStatus &&
              <View className={`flex-row justify-between items-center shadow-t-xl  bg-white px-5 pb-5 w-full py-2`}>
                <View className={``}>
                  <Text>Price Range</Text>
                  <View className={`flex-row items-center`}>
                    <Text className={`text-xl text-black`}>US$ {trip.destination_address.PriceRange.child} - {trip.destination_address.PriceRange.adult}</Text>
                    <Text className={`text-sm text-gray-300`}>/person</Text>
                  </View>
                </View>
                <TouchableOpacity className={`flex-row items-center gap-x-2 bg-blue-900 rounded-lg p-3`} onPress={() => navigation.navigate('destination-availability', { trip })}>
                  <Text className={`text-white`}>Continue planning Trip</Text>
                  <Ionicons name='arrow-forward' size={25} color='white' />
                </TouchableOpacity>
              </View>
            }  
          </View>
        </ScrollView>
        {/* buttom */}
        {/* <View className={` w-full absolute bottom-0`}>
          <View className={`flex-row justify-between items-center shadow-t-xl  bg-white px-5 pb-5 w-full py-2`}>
            <View className={``}>
              <Text>Price Range</Text>
              <View className={`flex-row items-center`}>
                <Text className={`text-xl text-black`}>US$ {trip.destination_address.PriceRange.child} - {trip.destination_address.PriceRange.adult}</Text>
                <Text className={`text-sm text-gray-300`}>/person</Text>
              </View>
            </View>
            <TouchableOpacity className={`flex-row items-center gap-x-2 bg-blue-900 rounded-lg p-3`} onPress={() => navigation.navigate('place-availability', {trip })}>
              <Text className={`text-white`}>Schedule Trip</Text>
              <Ionicons name='arrow-forward' size={25} color='white' />
            </TouchableOpacity>
          </View>
        </View> */}
      </View>
    </View>
  )
}
//

// About the PLACE  button tabs
const aboutTabs = (aboutTab, setAboutTab, id, title, icon) => {
  return (
    <TouchableOpacity onPress={() => { setAboutTab(id) }} className={`flex-row items-center gap-x-1 ${aboutTab === id ? '' : ''}`}>
      <Ionicons name={icon} size={15} color='#2a3ab3' />
      <Text className={`text-md italic ${aboutTab === id ? 'text-[#2a3ab3] border-b border-black' : 'text-gray-400'}`}>{title}</Text>
    </TouchableOpacity>
  )
}

//Carousel Bottom Tabs
const carouselButtons = (carouselCurrentTab, setCarouselCurrentTab, id) => {
  return (
    <TouchableOpacity key={id} className={`rounded-full w-2 h-2 ${carouselCurrentTab === id ? 'bg-white' : 'bg-gray-700'}`} onPress={() => { setCarouselCurrentTab(id) }}></TouchableOpacity>
  )
} 