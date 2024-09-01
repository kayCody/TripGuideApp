import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet, Image } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import * as Location from 'expo-location';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../../constants/AuthContext';
import { emergency } from '../../../assets';
import Mailer from 'react-native-mail';

export default function EmergencyScreen({ navigation }) {
  const [location, setLocation] = useState(null);
  const [emergencyType, setEmergencyType] = useState('');
  const { user } = useAuth();




  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Allow location access for emergency assistance.');
        return;
      }

      let loc = await Location.getCurrentPositionAsync({});
      setLocation(loc.coords);
    })();
  }, []);

  const handleEmergency = async (type) => {
    setEmergencyType(type);

    // Send the emergency information (type, location) to contacts or security agencies
    sendEmergencyNotification(type, location);
    sendEmergencyEmail(type, location);
  };

  const sendEmergencyEmail = () => {
    Mailer.mail({
      subject: `Emergency Alert!(${type})`,
      recipients: ['nanaqwame763@gmail.com'], // Array of recipient emails
      body: `This is an emergency.\n Please help! My current location is [include location here].\n ${message}`,
      isHTML: false,
    }, (error, event) => {
      if (error) {
        console.log('Error sending email:', error);
      } else {
        console.log('Email sent successfully');
      }
    });
  };

  const sendEmergencyNotification = async (type, loc) => {
    if (!loc) {
      Alert.alert('Location Error', 'Unable to get your current location.');
      return;
    }
    const message = `Emergency Alert: ${type}\nLocation: https://maps.google.com/?q=${loc.latitude},${loc.longitude}`;

    
    // Here you can integrate with your backend or third-party service to send SMS, Email, etc.
    console.log("Sending emergency notification...", message);

    // Display confirmation
    Alert.alert('Emergency Sent', `Your emergency (${type}) has been reported.`);
  };

  return (
    <View style={styles.container}>
      
      <Text style={styles.title}>Select Your Emergency</Text>
      <View style={styles.emergencyOptions}>
        <TouchableOpacity style={styles.optionButton} onPress={() => handleEmergency('Medical Emergency')}>
          <Ionicons name="medical-outline" size={30} color="white" />
          <Text style={styles.optionText}>Medical</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionButton} onPress={() => handleEmergency('Lost Emergency')}>
          <Ionicons name="flame-outline" size={30} color="white" />
          <Text style={styles.optionText}>Lost</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionButton} onPress={() => handleEmergency('Crime Emergency')}>
          <Ionicons name="alert-circle-outline" size={30} color="white" />
          <Text style={styles.optionText}>Crime</Text>
        </TouchableOpacity>
      </View>
      <View className={` px-5 py-3`}>
        <Text className={`font-bold text-xl`}>Foot NoteGuide:</Text>
        <Text className={`text-gray-400 `}>
          Emergency Type Selection:

          Users can select the type of emergency (e.g., Medical, Fire, Crime).
          This selection could trigger specific actions or provide tailored instructions.
          Location Access:

          The app accesses the user's current GPS location using the device's location services.
          The location data is crucial for providing accurate information to emergency services.
          Alert Contacts:

        </Text>
      </View>
      {/* Footer */}
      <View className={`absolute bottom-0 `}>
        <Image source={emergency} style={{ width: wp('100%'), height: hp('20%') }} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  emergencyOptions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
  },
  optionButton: {
    alignItems: 'center',
    backgroundColor: '#ff5252',
    padding: 20,
    borderRadius: 10,
  },
  optionText: {
    color: 'white',
    marginTop: 10,
  },
});
