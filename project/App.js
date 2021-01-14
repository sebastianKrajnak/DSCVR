import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useState } from 'react';
import { View, PermissionsAndroid, TouchableOpacity, Text, Image} from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import styles from "./Styles"

//import Geolocation from '@react-native-community/geolocation';

/* 
import Entry from './Entry';
import useWatchLocation from "./hooks/useWatchLocation";
import { geolocationOptions } from "./constants/geolocationOptions";
import Location from "./components/Location";
 */

 const HomeScreen = ({navigation}) => {
  const [data, setData] = useState([]);

   return(
    <View style={styles.container}>
      <MapView provider={PROVIDER_GOOGLE} style={styles.map} showsUserLocation={true} showsBuildings={false} showsPointsOfInterest={false} showsTraffic={false}
        region={{
          latitude:48.717776,
          longitude: 21.259287,
          latitudeDelta: 0.0009,
          longitudeDelta: 0.0010
        }}
      >
        
      </MapView>

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.searchBar}>
          <Text style={{fontSize: 20, color: 'white', fontFamily: 'Roboto'}}>Search...</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonNewEntry} onPress={() => navigation.navigate('New Entry')}>
          <Text style={{fontSize: 40, color: 'white', fontFamily: 'Roboto'}}>+</Text>
        </TouchableOpacity>
      </View>

      <View style={{position: 'absolute', marginTop: '125%', marginLeft: '83.5%'}}>
        <TouchableOpacity style={styles.buttonLocation}>
          <Image source={require('./assets/position.png')} style={{width: 30, height: 30}}/>
        </TouchableOpacity>
      </View>
    
      <View style={{position: 'absolute',marginTop: '5%', marginLeft: '5%'}}>
        <TouchableOpacity style={styles.buttonMenu}>
          <Image source={require('./assets/menu.jpg')} style={{width: 25, height: 25}}/>
        </TouchableOpacity>
      </View>
    </View>
   );
 }

 function NewEntryScreen(){
   return(
     <View>
      <Text>Hello</Text>
     </View>
   );
 }

const Stack = createStackNavigator();

const requestLocationPermission = async () => {
  try{
    const response = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
      title: "Location Permission",
      message: "DSCVR needs access to your location " + "so it can function properly.",
      buttonNeutral: "Ask Me Later",
      buttonNegative: "Cancel",
      buttonPositive: "OK"
      }
    )
    if(response === PermissionsAndroid.RESULTS.GRANTED){
      console.log("Location permission granted")
    }
    else{
      console.log("Location permission denied")
    }
  }catch(err){
    console.warn(err);
  }
};

export default function App() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName={"Home"}>
          <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false}}/>
          <Stack.Screen name="New Entry" component={NewEntryScreen} options={{headerShown: false}}/>
        </Stack.Navigator>
      </NavigationContainer>
      
    );
};