import { ScrollView, SafeAreaView, View, Text, TouchableOpacity, TextInput, Image, FlatList } from 'react-native'
import React, { useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { WorldTouristPlaces } from '../../../conf/Data';

export default function Destinations({ navigation }) {
  const [currentTab, setCurrentTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  // Function to handle search and filter data
  const handleSearch = (query) => {
    setSearchQuery(query);
  };
  return (
    <SafeAreaView className={`flex-1 bg-white`}>
      <View className={``}>

        {/* text-label & notification icon */}
        <View className='px-3 pt-5'>
          <View className={`p-2 flex-row gap-x-2 rounded-lg bg-white ml-1 justify-center items-center shadow-md w-full`}>
            <TextInput
              value={searchQuery}
              onChangeText={(query) => handleSearch(query)}
              placeholder='search here e.g.: places, location, tourist site etc...' style={{ width: wp('80%') }}
              className={``}
            />
            <TouchableOpacity onPress={() => { console.log('to display modal list of options for search') }} className={`p-2 rounded-lg bg-blue-950`}><Ionicons name='search' size={20} color='white' /></TouchableOpacity>
          </View>
        </View>


        {/* Body style / design */}
        <ScrollView className='p-3 space-y-8'>
          {/* Recommendations */}
          <View className=''>
            <Text className={`text-xl font-semibold`}>Explore Places</Text>
            {/* Categories */}
            <View className=''>
              <ScrollView horizontal={true} style={{ width: wp('95%') }} className='py-2'>
                {/* cat-tabs */}
                <View className='flex-row gap-x-3 justify-center items-center'>
                  {CatTabs(currentTab, setCurrentTab, 'All')}
                  {CatTabs(currentTab, setCurrentTab, 'Popular')}
                  {CatTabs(currentTab, setCurrentTab, 'Recommended')}
                  {CatTabs(currentTab, setCurrentTab, 'Most visited')}
                  {CatTabs(currentTab, setCurrentTab, 'Activities')}
                </View>
              </ScrollView>
              {/* Tab Contents Display */}
              <View className=''>
                {currentTab === 'All' && (
                  <ScrollView className={``} style={{}} horizontal={true}>
                    {WorldTouristPlaces ? (
                      <>
                        {
                          WorldTouristPlaces.map(place => (
                            <TouchableOpacity key={place.id} onPress={() => navigation.navigate('place-detail', { place })} className={`relative flex gap-x-3 mr-2`}>
                              <Image source={place.PlaceImage[0]} className={`rounded-xl shadow-lg p-2`} style={{ height: hp('10%'), width: wp('55%') }} />
                              <View className='absolute top-0 right-0  p-2 '>
                                <View className='rounded-full w-8 h-8 flex items-center justify-center bg-gray-500 bg-opacity-5'>
                                  <TouchableOpacity><Ionicons name='heart-outline' size={20} color='white' /></TouchableOpacity>
                                </View>
                              </View>
                              <View className=''>
                                <Text className='text-lg font-bold'>{place.Name}</Text>
                                <View className='flex-row items-center'>
                                  <Ionicons name='location' size={15} color='red' />
                                  <Text className='text-sm text-gray-400'>{place.Location}</Text>
                                </View>
                              </View>
                            </TouchableOpacity>
                          ))
                        }
                      </>
                    ) : (
                      <Text className> No Data loaded yet /fetched</Text>
                    )}
                  </ScrollView>
                )}
                {currentTab === 'Popular' && (
                  <ScrollView className={``} style={{}} horizontal={true}>
                    {WorldTouristPlaces ? (<>
                      {WorldTouristPlaces.map(place => (
                        <View className={``} key={place.id}>
                          {place.Rating > 4 && (
                            <TouchableOpacity key={place.id} onPress={() => navigation.navigate('place-detail', { place })} className={`relative flex gap-x-3 mr-2`}>
                              <Image source={place.PlaceImage[0]} className={`rounded-xl shadow-lg p-2`} style={{ height: hp('10%'), width: wp('55%') }} />
                              <View className='absolute top-0 right-0  p-2 '>
                                <View className='rounded-full w-8 h-8 flex items-center justify-center bg-gray-500 bg-opacity-5'>
                                  <TouchableOpacity><Ionicons name='heart-outline' size={20} color='white' /></TouchableOpacity>
                                </View>
                              </View>
                              <View className=''>
                                <Text className='text-lg font-bold'>{place.Name}</Text>
                                <View className='flex-row items-center'>
                                  <Ionicons name='location' size={15} color='red' />
                                  <Text className='text-sm text-gray-400'>{place.Location}</Text>
                                </View>
                              </View>
                            </TouchableOpacity>
                          )}
                        </View>
                      ))}
                    </>) : (<Text>No Data loaded / fetched</Text>)}
                  </ScrollView>
                )}
                {currentTab === 'Recommended' && (
                  <ScrollView className={``} style={{}} horizontal={true}>
                    {WorldTouristPlaces ? (<>
                      {WorldTouristPlaces.map(place => (
                        <View className={``} key={place.id}>
                          {place.ratings > 3 < 4 && (
                            <TouchableOpacity key={place.id} onPress={() => navigation.navigate('place-detail', { place })} className={`relative flex gap-x-3 mr-2`}>
                              <Image source={place.PlaceImage[0]} className={`rounded-xl shadow-lg p-2`} style={{ height: hp('10%'), width: wp('55%') }} />
                              <View className='absolute top-0 right-0  p-2 '>
                                <View className='rounded-full w-8 h-8 flex items-center justify-center bg-gray-500 bg-opacity-5'>
                                  <TouchableOpacity><Ionicons name='heart-outline' size={20} color='white' /></TouchableOpacity>
                                </View>
                              </View>
                              <View className=''>
                                <Text className='text-lg font-bold'>{place.Name}</Text>
                                <View className='flex-row items-center'>
                                  <Ionicons name='location' size={15} color='red' />
                                  <Text className='text-sm text-gray-400'>{place.Location}</Text>
                                </View>
                              </View>
                            </TouchableOpacity>
                          )}
                        </View>
                      ))}
                    </>) : (<Text>No Data loaded / fetched</Text>)}
                  </ScrollView>
                )}
                {currentTab === 'Most visited' && (
                  <ScrollView className={``} style={{}} horizontal={true}>
                    {
                      WorldTouristPlaces ? (<>
                        {WorldTouristPlaces.map(place => (
                          <View className={``} key={place.id}>
                            {place.Rating === 0 ? (
                              <TouchableOpacity key={place.id} onPress={() => navigation.navigate('place-detail', { place })} className={`relative flex gap-x-3 mr-2`}>
                                <Image source={place.PlaceImage[0]} className={`rounded-xl shadow-lg p-2`} style={{ height: hp('10%'), width: wp('55%') }} />
                                <View className='absolute top-0 right-0  p-2 '>
                                  <View className='rounded-full w-8 h-8 flex items-center justify-center bg-gray-500 bg-opacity-5'>
                                    <TouchableOpacity><Ionicons name='heart-outline' size={20} color='white' /></TouchableOpacity>
                                  </View>
                                </View>
                                <View className=''>
                                  <Text className='text-lg font-bold'>{place.Name}</Text>
                                  <View className='flex-row items-center'>
                                    <Ionicons name='location' size={15} color='red' />
                                    <Text className='text-sm text-gray-400'>{place.Location}</Text>
                                  </View>
                                </View>
                              </TouchableOpacity>
                            ) : (<Text>No match data received</Text>)}
                          </View>
                        ))}
                      </>) : (<Text>No Data loaded / fetched</Text>)
                    }
                  </ScrollView>
                )}
                {currentTab === 'Activities' && (
                  <ScrollView className={``} style={{}} horizontal={true}>
                    {
                      WorldTouristPlaces ? (<>
                        {WorldTouristPlaces.map(place => (
                          <View className={``} key={place.id}>
                            {place.Rating === 0 ? (
                              <TouchableOpacity key={place.id} onPress={() => navigation.navigate('place-detail', { place })} className={`relative flex gap-x-3 mr-2`}>
                                <Image source={place.PlaceImage[0]} className={`rounded-xl shadow-lg p-2`} style={{ height: hp('10%'), width: wp('55%') }} />
                                <View className='absolute top-0 right-0  p-2 '>
                                  <View className='rounded-full w-8 h-8 flex items-center justify-center bg-gray-500 bg-opacity-5'>
                                    <TouchableOpacity><Ionicons name='heart-outline' size={20} color='white' /></TouchableOpacity>
                                  </View>
                                </View>
                                <View className=''>
                                  <Text className='text-lg font-bold'>{place.Name}</Text>
                                  <View className='flex-row items-center'>
                                    <Ionicons name='location' size={15} color='red' />
                                    <Text className='text-sm text-gray-400'>{place.Location}</Text>
                                  </View>
                                </View>
                              </TouchableOpacity>
                            ) : (<Text>No match data received</Text>)}
                          </View>
                        ))}
                      </>) : (<Text>No Data loaded / fetched</Text>)
                    }
                  </ScrollView>
                )}
              </View>
            </View>
          </View>
          {/* popular places */}
          <View className='space-y-1'>
            <View className='flex-row justify-between items-center'>
              <Text className='text-xl font-bold'>Browse places & Activities </Text>
              <TouchableOpacity className={``}>
                <Text className='text-sm text-blue-400'>See all</Text>
              </TouchableOpacity>
            </View>
            <ScrollView className='' style={{ height: hp('39%') }}>
              {WorldTouristPlaces ? (<>
                {WorldTouristPlaces.map(place => (
                  <TouchableOpacity key={place.id} onPress={() => navigation.navigate('place-detail', { place })} className={`relative flex-row  bg-[#f1f2f4]  rounded-xl mb-2`} style={{ width: wp('94%') }}>
                    <Image source={place.PlaceImage[0]} className={`rounded-xl shadow-lg `} style={{ height: hp('10%'), width: wp('25%') }} />
                    <View className='absolute top-0 right-0  p-2 rounded-full'>
                      <View className='rounded-full w-8 h-8 flex items-center justify-center bg-gray-500 bg-opacity-5'>
                        <TouchableOpacity><Ionicons name='heart-outline' size={20} color='white' /></TouchableOpacity>
                      </View>
                    </View>
                    <View className='ml-2'>
                      <View className='space-y-2 p-1'>
                        <Text className='text-lg text-black font-bold'>{place.Name}</Text>
                        <View className='flex-row items-center'>
                          <Ionicons name='location' size={15} color='red' />
                          <Text className='text-sm text-gray-400'>{place.Location}</Text>
                        </View>
                        <View className='flex-row items-center gap-x-1'>
                          <Ionicons name='star-half' size={15} color='yellow' />
                          <Text className='text-sm text-gray-400'>{place.Rating}</Text>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
              </>) : (<>No Data loaded / fetched</>)}
            </ScrollView>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

const CatTabs = (currentTab, setCurrentTab, title) => {
  return (
    <TouchableOpacity className={`p-2 flex justify-center items-center ${currentTab === title && 'border-b-2 border-black'}`} onPress={() => { setCurrentTab(title) }}>
      <Text className={`${currentTab === title ? 'text-[#000000]' : 'text-gray-400'}`}>{title}</Text>
    </TouchableOpacity>
  )
}