/* import React, {Component} from 'react';
import { StyleSheet, View, PermissionsAndroid, Alert} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
        userLocation:{
          latitude: 48.71395,
          longitude: 21.25808,
          latitudeDelta: 0.003,
          longitudeDelta: 0.003,
        },
    };
}

  componentDidMount(){
    this.requestLocationPermission();
    
  }

  requestLocationPermission = async () => {
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
        Geolocation.getCurrentPosition(info => console.log(info));
      }
      else{
        console.log("Location permission denied")
      }
    }catch(err){
      console.warn(err);
    }
  }

  locateCurrentPosition = () =>{
    Geolocation.getCurrentPosition(
      position => {
        this.setState({
          userLocation:{
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0.003,
            longitudeDelta: 0.003,
          },
        })
      }, error => console.log(error),
        {enableHighAccuracy: true, timeout: 10000, maximumAge: 1000}
    );
  } 

  handleCenter = () => {
    let location = this.state.pos;
    this.map.animateToRegion({
      latitude: pos.latitude,
      longitude: pos.longitude,
      latitudeDelta: 0.003,
      longitudeDelta: 0.003,
    })
  }
 
  render(){
    return (
      <View style={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE}
          ref={map => this.map = map}
          style={styles.map}
          showsUserLocation={true}
          followsUserLocation={true}
          animateToRegion={this.locateCurrentPosition}
          region={this.state.userLocation}/>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: "100%",
  },

  map: {
    ...StyleSheet.absoluteFillObject,
  }
}); 
 */


import React, {Component} from 'react';
import { StyleSheet, View, Alert, PermissionsAndroid} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

export default class App extends Component {
  constructor(props) {
    super(props);
    //this is just for test 2
    //maybe add this
  
    this.state = {
        inititalPosition: {
          latitude: 0,
          longitude: 0,
          latitudeDelta: 0.009,
          longitudeDelta: 0.009,
        },
        markerPosition: {
          latitude: 0,
          longitude:0
        }
    };
  }

  componentDidMount(){
       Geolocation.getCurrentPosition((position) => {

        var inititalRegion = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.009,
          longitudeDelta: 0.009
        }

        this.setState({inititalPosition: inititalRegion})
        this.setState({markerPosition: inititalRegion})

      }, 
        (error) => alert(JSON.stringify(error)),{enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
      )

    this.watchID = Geolocation.watchPosition((position) => {

      var lastRegion = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        latitudeDelta: 0.009,
        longitudeDelta: 0.009
      }

      this.setState({inititalPosition: lastRegion})
      this.setState({markerPosition: lastRegion})

    })
  }

  componentWillUnmount(){
    Geolocation.clearWatch(this.watchID)
  }

  requestLocationPermission = async () => {
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
  }

  render(){
    return (
      <View style={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          showsUserLocation={true}
          region={this.state.inititalPosition}>
            <Marker coordinate={this.state.markerPosition}/>
        </MapView>
          
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: "100%",
  },

  map: {
    ...StyleSheet.absoluteFillObject,
  }
}); 