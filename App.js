import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AppNavigation from './navigation/AppNavigation';
import { AuthProvider, useAuth } from './constants/AuthContext';
export default function App() {
  return (
    <GestureHandlerRootView >
      <AuthProvider>
        <AppNavigation />
      </AuthProvider>
    </GestureHandlerRootView>
  );
}