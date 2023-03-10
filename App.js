import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Users from './screens/Users';
import Register from './screens/Register';
import UserDetails from './screens/UserDetails';
export default function App() {
  const Stack = createStackNavigator();
  function MyStack (){
    return(
      <Stack.Navigator>
        <Stack.Screen name='Usuarios' component={Users}/>
        <Stack.Screen name='Detalles' component={UserDetails}/>
        <Stack.Screen name='Registro' component={Register}/>
      </Stack.Navigator>
    );
  }
  return (
    <NavigationContainer>
      <MyStack/>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
