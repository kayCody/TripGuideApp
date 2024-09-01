import { View, Text, TouchableOpacity, TextInput, Modal, FlatList, ActivityIndicator, Alert } from 'react-native'
import React, { useState, useRef } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function ExpenseCal({bottomSheetRef, budget, setCal}) {
  const calculateRemainingBudget = (data) => {
    // Calculate total expenses
    const totalDestinationsCost = data.destinations.reduce((sum, item) => sum + item.cost, 0);
    const totalRestaurantsCost = data.restaurants.reduce((sum, item) => sum + item.cost, 0);
    const totalActivitiesCost = data.activities.reduce((sum, item) => sum + item.cost, 0);

    const totalExpenses = totalDestinationsCost + totalRestaurantsCost + totalActivitiesCost;

    // Calculate remaining budget
    const remainingBudget = data.budget - totalExpenses;

    return remainingBudget;
  };

  const remainingBudget = calculateRemainingBudget(data);
  console.log(`Remaining Budget: $${remainingBudget}`);
  return (
    <View>
      <View className={`px-5 flex-row justify-between items-center`}>
        <TouchableOpacity className onPress={() => {
          bottomSheetRef.current?.close();
          setCal(false)
        }}><Text className={`text-blue-400 text-lg`}>Cancel</Text></TouchableOpacity>
        <Text className={`text-xl font-semibold`}>Trip Expense</Text>
        <TouchableOpacity onPress={() => { handleSubmitTrip() }}><Text className={`text-blue-400 text-lg`}>Save</Text></TouchableOpacity>
      </View>
      <View className={``}>
        <View className={`border-b border-gray-300 p-3`}>
          <Text style={{ fontWeight: 'bold' }}>Total Trip Budget:</Text>
          <Text>{budget}</Text>
        </View>
        <View className={`border-b border-gray-300 p-3`}>
          <Text style={{ fontWeight: 'bold' }}>Total Expenses:</Text>
          <Text>0</Text>
        </View>
        <View className={`border-b border-gray-300 p-3`}>
          <Text style={{ fontWeight: 'bold' }}>Remaining Budget:</Text>
          <Text>0</Text>
        </View>
      </View>
    </View>
  )
}