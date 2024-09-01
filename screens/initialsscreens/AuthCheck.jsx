import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { useAuth } from '../../constants/AuthContext'; 
import { supabase } from '../../conf/supabaseClient';

export default function AuthCheck({navigation}) {
  const { setAuth } = useAuth();

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log('session :', session?.user?.id);
      if (session) {
        setAuth(session.user);
        navigation.replace('bottomTab');
      } else {
        setAuth(null);
        navigation.replace('welcome');
      }
    });

  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color="#0000ff" />
      <Text>Loading...</Text>
    </View>
  );
};