import 'react-native-gesture-handler';
import React from 'react';
import { View, PermissionsAndroid, TouchableOpacity, Text, Image, Alert } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import styles from "../Styles"
import i18n, {changeLang} from '../i18n';
import MenuDrawer from 'react-native-side-drawer'
import Geolocation from '@react-native-community/geolocation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNRestart from 'react-native-restart';

// god why didn't I comment on what does what when I was writing it and now I have to comment everything after being done,
// mental note, write comments while coding, not after you're finished idot

export default class HomeScreen extends React.Component {
    constructor(props) {
      super(props);
  
      this.state = {
        buildings: [],
        menuOpen: false,
        language: '',
        initialPosition: {
          latitude: 0,
          longitude: 0,
          latitudeDelta: 0,
          longitudeDelta: 0
        }
      };
    }
  
    componentDidMount() { //fetch data for buildings from JSON
      this.requestLocationPermission()
      
      Geolocation.getCurrentPosition((position) => {    //get's current device location and saves it into state for MapView to be able to use
        var initialRegion = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.0043, //0.0009
          longitudeDelta: 0.0034 //0.0010
        }
  
        this.setState({initialPosition: initialRegion})
      }, error => Alert.alert(error.message),
        {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
      )
    }
  
     mapMarkers = () => { //add a marker on the map for every entry found in the JSON file
       return this.state.buildings.map((building) => <Marker
        key={building.id}
        coordinate={{ latitude: building.latitude, longitude: building.longitude }}
        title={building.name}
        description={building.function}
        pinColor={'#884AB2'}
        onCalloutPress={() => { this.props.navigation.navigate('Entry', {
            itemID: building.id,  
            name: building.name,
            func: building.function,
            address: building.address,
            architect: building.architect,
            realization: building.realization,
            image: building.img,
            description: building.description
            });
          }
         }
       >
       </Marker >)
     };
  
     toggleOpen = () =>{    // self explanatory
       this.setState({menuOpen: !this.state.menuOpen});
     };
  
     drawerContent = () =>{   // creates the view for the side menu
       return(
         <View style={styles.animatedMenu}>
  
          <TouchableOpacity onPress={this.toggleOpen}>
            <Image source={require('../assets/back.png')} style={{marginLeft: 120, marginTop: 20}}/>
          </TouchableOpacity>
  
          <View style={{marginTop: 20, height: '25%', justifyContent: 'space-between'}}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('FavList', {language: this.state.language})}>
              <Text style={styles.textEntryText}> {i18n.t('favlist')} </Text>
            </TouchableOpacity>
  
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Search', {language: this.state.language})}>
              <Text style={styles.textEntryText}> {i18n.t('search')} </Text>
            </TouchableOpacity>
  
            <Text style={styles.textEntryText}> {i18n.t('language')} </Text>
  
            <View style={{flexDirection: 'row', justifyContent: 'space-around', marginRight: 20}}>
              <TouchableOpacity onPress={() => {changeLang('sk');  RNRestart.Restart();}}>
                <Image source={require('../assets/sk.png')} style={{marginLeft: 30}}/>
              </TouchableOpacity>
  
              <TouchableOpacity onPress={() => {changeLang('en');  RNRestart.Restart()}}>
                <Image source={require('../assets/gb.png')} />
              </TouchableOpacity>
            </View>
          </View>
         </View>
      ); 
     }
     
     locateCurrentPosition = () => {
       Geolocation.getCurrentPosition(
         position =>{
           //console.log(JSON.stringify(position));
  
           let region={
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0.0043,
            longitudeDelta: 0.0034
           }
  
           //this.setState({initialPosition: region})
           this.mapRef.animateToRegion(region)
         },
         error => Alert.alert(error.message),
         {enableHighAccuracy: true, timeout: 10000, maximumAge: 1000}
       )
     }
  
     requestLocationPermission = async () => {
       try{
         const response = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
         )
         if(response === PermissionsAndroid.RESULTS.GRANTED){
           console.log("Location permission granted");
         }
         else{
           console.log("Location permission denied");
           this.requestLocationPermission();
         }
  
        let language = await AsyncStorage.getItem('language');  // checks what language user selected, selected language gets stored in AsyncStorage for later use
        changeLang(language);
        this.setState({language: language})
  
        if(language === 'en'){
          fetch('https://jsonkeeper.com/b/FGKR')
            .then(res => res.json())
            .then(data => {
              this.setState({ buildings: data.buildings })
            })
            .catch(console.error)
        }
        else if(language === 'sk'){
          fetch('https://jsonkeeper.com/b/NWIW')
            .then(res => res.json())
            .then(data => {
              this.setState({ buildings: data.buildings })
            })
            .catch(console.error)
        }
       }catch(err){
         console.warn(err);
       }
     };
  
  
     render(){
       return(
        <View style={styles.container}>
          <MenuDrawer open={this.state.menuOpen} drawerContent={this.drawerContent()} drawerPercentage={50} animationTime={250} overlay={true} opacity={0.4} position={'right'}>
            <MapView ref={map => this.mapRef = map} provider={PROVIDER_GOOGLE} style={styles.map} showsUserLocation={true} 
              region={this.state.initialPosition} onUserLocationChange={() => this.locateCurrentPosition()}
            >
              {this.mapMarkers()}
            </MapView>
  
            <View style={styles.buttonRow}>
              <TouchableOpacity style={styles.buttonNewEntry} onPress={() => this.props.navigation.navigate('New Entry')}>
                <Text style={{fontSize: 40, color: 'white', fontFamily: 'Sen'}}>+</Text>
              </TouchableOpacity>
            </View>
  
            <View style={{position: 'absolute', marginTop: '125%', marginLeft: '83.5%'}}>
              <TouchableOpacity style={styles.buttonLocation} onPress={() => this.locateCurrentPosition()}>
                <Image source={require('../assets/position.png')} style={{width: 30, height: 30}}/>
              </TouchableOpacity>
            </View>
          
            <View style={{position: 'absolute',marginTop: '5%', marginLeft: '83.5%'}}>
              <TouchableOpacity style={styles.buttonMenu} onPress={this.toggleOpen}>
                <Image source={require('../assets/menu.jpg')} style={{width: 25, height: 25}}/>
              </TouchableOpacity>
            </View>
          </MenuDrawer>
        </View>
      );
    }
   }