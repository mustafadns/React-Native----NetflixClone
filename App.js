import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen'
import MainPage from './screens/MainPage';
import AuthContextProvider, { AuthContext } from './store/auth-context';
import HomeScreen from './screens/HomeScreen';
import { useContext } from 'react';
import PersonsScreen from './screens/PersonsScreen';
import MoviesAndSeriesDetailScreen from './screens/MoviesAndSeriesDetailScreen';
import MoviesScreen from './screens/MoviesScreen';
import SeriesScreen from './screens/SeriesScreen';


const Stack = createNativeStackNavigator();

function NormalStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='MainPage'
        component={MainPage}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          headerShown: false
        }}
      />
    </Stack.Navigator>
  )
}

function AuthenticatedStack() {
  const authContext = useContext(AuthContext);
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='Persons'
        component={PersonsScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name='Home'
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name='MoviesAndSeriesDetail'
        component={MoviesAndSeriesDetailScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name='Movies'
        component={MoviesScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name='Series'
        component={SeriesScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  )
}

function Navigation() {
  const authContext = useContext(AuthContext);
  return (
    <View style={styles.container}>
      <NavigationContainer>
        {!authContext.isAuthenticated && <NormalStack />}
        {authContext.isAuthenticated && <AuthenticatedStack />}
      <StatusBar style="light" />
    </NavigationContainer>
    </View>
  )
}

export default function App() {
  return (
    <View style={styles.container}>
      <AuthContextProvider>
        <Navigation />
      </AuthContextProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1c1c1c'
  },
});
