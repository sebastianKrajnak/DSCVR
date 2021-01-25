import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import HomeScreen from './pages/HomeScreen'
import NewEntryScreen from './pages/NewEntryScreen'
import EntryScreen from './pages/EntryScreen'
import FavList from './pages/FavList'
import Search from './pages/Search'
import ConfirmationScreen from './pages/ConfirmationScreen'

 //DSCVR
 //Author: Sebastian Krajnak

 //EN JSON hosted at https://jsonkeeper.com/b/CDFD
 //SK JSON hosted at https://jsonkeeper.com/b/VP53


const Stack = createStackNavigator();
 
export default class App extends React.Component {
  render(){
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName={"Home"}>
          <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false}}/>
          <Stack.Screen name="New Entry" component={NewEntryScreen} options={{headerShown: false}}/>
          <Stack.Screen name="Entry" component={EntryScreen} options={{headerShown: false}}/>
          <Stack.Screen name="FavList" component={FavList} options={{headerShown: false}}/>
          <Stack.Screen name="Search" component={Search} options={{headerShown: false}}/>
          <Stack.Screen name="ConfirmationScreen" component={ConfirmationScreen} options={{headerShown: false}}/>
        </Stack.Navigator>
      </NavigationContainer>      
    );
  }
};