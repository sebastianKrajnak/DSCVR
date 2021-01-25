import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { View, PermissionsAndroid, TouchableOpacity, Text, Image, TextInput, ScrollView, Alert } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import styles from "./Styles"
import i18n, {changeLang} from './i18n';
import MenuDrawer from 'react-native-side-drawer'
import Geolocation from '@react-native-community/geolocation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNRestart from 'react-native-restart';
import { SearchBar } from 'react-native-elements';
import { FlatList } from 'react-native-gesture-handler';

 //EN JSON hosted at https://jsonkeeper.com/b/CDFD
 //SK JSON hosted at https://jsonkeeper.com/b/VP53

 //DSCVR
 //Author: Sebastian Krajnak


 class HomeScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      buildings: [],
      menuOpen: false,
      language: '',
      favourites: [],
      isFavourite: false,
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
    
    Geolocation.getCurrentPosition((position) => {
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
     return this.state.buildings.map((building, i) => <Marker
      key={building.id}
      coordinate={{ latitude: building.latitude, longitude: building.longitude }}
      title={building.name}
      description={building.function}
      pinColor={'#884AB2'}
      onCalloutPress={() => { this.props.navigation.navigate('Entry', {
          i,
          state: this.state,
          itemID: building.id,
          name: building.name,
          func: building.function,
          address: building.address,
          architect: building.architect,
          realization: building.realization,
          image: building.img,
          description: building.description,
          favourite: this.state.isFavourite
          });
        }
       }
     >
     </Marker >)
   };

   toggleOpen = () =>{
     this.setState({menuOpen: !this.state.menuOpen});
   };

   drawerContent = () =>{
     return(
       <View style={styles.animatedMenu}>

        <TouchableOpacity onPress={this.toggleOpen}>
          <Image source={require('./assets/back.png')} style={{marginLeft: 120, marginTop: 20}}/>
        </TouchableOpacity>

        <View style={{marginTop: 20, height: '25%', justifyContent: 'space-between'}}>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('FavList')}>
            <Text style={styles.textEntryText}> {i18n.t('favlist')} </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.props.navigation.navigate('Search', {language: this.state.language})}>
            <Text style={styles.textEntryText}> {i18n.t('search')} </Text>
          </TouchableOpacity>

          <Text style={styles.textEntryText}> {i18n.t('language')} </Text>

          <View style={{flexDirection: 'row', justifyContent: 'space-around', marginRight: 20}}>
            <TouchableOpacity onPress={() => {changeLang('sk');  RNRestart.Restart();}}>
              <Image source={require('./assets/sk.png')} style={{marginLeft: 30}}/>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {changeLang('en');  RNRestart.Restart()}}>
              <Image source={require('./assets/gb.png')} />
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

      let language =  await AsyncStorage.getItem('language');
      changeLang(language);
      this.setState({language: language})

      if(language === 'en'){
        fetch('https://jsonkeeper.com/b/CDFD')
          .then(res => res.json())
          .then(data => {
            this.setState({ buildings: data.buildings })
          })
          .catch(console.error)
      }
      else if(language === 'sk'){
        fetch('https://jsonkeeper.com/b/VP53')
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
              <Image source={require('./assets/position.png')} style={{width: 30, height: 30}}/>
            </TouchableOpacity>
          </View>
        
          <View style={{position: 'absolute',marginTop: '5%', marginLeft: '83.5%'}}>
            <TouchableOpacity style={styles.buttonMenu} onPress={this.toggleOpen}>
              <Image source={require('./assets/menu.jpg')} style={{width: 25, height: 25}}/>
            </TouchableOpacity>
          </View>
        </MenuDrawer>
      </View>
    );
  }
 }

 class NewEntryScreen extends React.Component{
   render(){
    return(
      <View style={styles.containerEntry}>
        <ScrollView style={{flex: 1}}>

          <View style={styles.imageAdd}>
            <TouchableOpacity>
              <Image source={require('./assets/plus.png')}/>
            </TouchableOpacity>
          </View>

          <View style={styles.group}>
            <Text style={styles.textEntry}> {i18n.t('name')} </Text>
              <TextInput style={styles.textInput} placeholder={i18n.t('typeHere')} onChangeText={(text) => this.setState({text})} placeholderTextColor={`#ffffff`} textAlign={'center'}/>
            <Text style={styles.textEntry}> {i18n.t('architect')} </Text>
              <TextInput style={styles.textInput} placeholder={i18n.t('typeHere')} onChangeText={(text) => this.setState({text})} placeholderTextColor={`#ffffff`} textAlign={'center'}/>
            <Text style={styles.textEntry}> {i18n.t('address')} </Text>
              <TextInput style={styles.textInput} placeholder={i18n.t('typeHere')} onChangeText={(text) => this.setState({text})} placeholderTextColor={`#ffffff`} textAlign={'center'}/>
            <Text style={styles.textEntry}> {i18n.t('func')} </Text>
              <TextInput style={styles.textInput} placeholder={i18n.t('typeHere')} onChangeText={(text) => this.setState({text})} placeholderTextColor={`#ffffff`} textAlign={'center'}/>
            <Text style={styles.textEntry}> {i18n.t('realization')} </Text>
              <TextInput style={styles.textInput} placeholder={i18n.t('typeHere')} onChangeText={(text) => this.setState({text})} placeholderTextColor={`#ffffff`} textAlign={'center'}/>
            <Text style={styles.textEntry}> {i18n.t('about')} </Text>
              <TextInput style={styles.textInputDesc} placeholder={i18n.t('typeHere')} onChangeText={(text) => this.setState({text})} multiline={true} placeholderTextColor={`#ffffff`} textAlign={'center'}/>
          </View>

          <View style={styles.buttonNewEntryRow}>
            <TouchableOpacity style={styles.buttonCancel} onPress={ () => {this.props.navigation.goBack()} }>
              <Image style={{width: 55, height: 55}} source={require('./assets/cancel.png')}/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonConfirm} onPress={ () => { 
              /* here would be a magical function to send the new entry to database*/
              this.props.navigation.navigate('ConfirmationScreen')} 
            }>
              <Image style={{width: 55, height: 55}} source={require('./assets/confirm.png')}/>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
 }

 class EntryScreen extends React.Component{
   /* addFav = () =>{
     let array = this.state.favourites;
     let addArray = true;
     array.map((building, key ) =>{
       if(building === this.props.route.params.i) {
         array.splice(key, 1);
         addArray = false;
       }
     });
     if(addArray){
       array.push(this.props.route.params.i);
     }
     this.setState({favourites: [...array]})
   } */

   favIcon = (favourite) => {
    if(favourite){
      () => <Image source={require('./assets/heartFull.png')}/>
    }
    else{
      () => <Image source={require('./assets/heartEmpty.png')}/>
    }
   }

   render(){
     const {itemID, name, description, architect, address, image, func, realization, favourite} =  this.props.route.params;
     var encodedImage = encodeURI(image);
     /* var heart = this.props.navigation.state.favourite 
      ? require('./assets/heartFull.png')
      : require('./assets/heartEmpty.png'); */
      
     return(
      <View style={styles.containerEntry}>
        <ScrollView style={{flex: 1}}>

          <View style={styles.image}>
            <Image source={{uri: encodedImage}} style={{width: '100%', height: '100%'}}/>
          </View>

          <View style={styles.rect}>
            <View style={styles.rectName}>
              <Text style={styles.name}>{name}</Text>
            </View>
            <TouchableOpacity style={styles.buttonFav} onPress={console.log(favourite)}>
              {/* {this.favIcon(favourite)} */}
            </TouchableOpacity>
          </View>

          <View style={styles.group}>
            <Text style={styles.textEntry}>{i18n.t('architect')} </Text>
              <Text style={styles.textEntryText}> {architect} </Text>
            <Text style={styles.textEntry}>{i18n.t('address')} </Text>
              <Text style={styles.textEntryText}> {address} </Text>
            <Text style={styles.textEntry}>{i18n.t('func')} </Text>
              <Text style={styles.textEntryText}> {func} </Text>
            <Text style={styles.textEntry}>{i18n.t('realization')} </Text>
              <Text style={styles.textEntryText}> {realization} </Text>
            <Text style={styles.textEntry}>{i18n.t('about')} </Text>
              <Text style={styles.textEntryText}> {description} </Text>
          </View>
        </ScrollView>
      </View>
     );
   }
 }

 class FavList extends React.Component{
   /*
    try saving favlist[] into async storage and then fetching it from there into state on Home, FavList and Entry pages and using the itemID as positions in the array
   */
   render(){
    const {itemID, name, description, architect, address, func} =  this.props.route.params;
     return(
       <View>
         <Text> {name} </Text>
       </View>
     );
   }
 }

 class ConfirmationScreen extends React.Component{
  render(){
    return(
      <View style={{flex: 1, backgroundColor: '#546A7B', justifyContent: 'center', alignItems: 'center'}}>
        <View style={{flex: 0.5, height: 40, margin: 15, marginRight: '80%'}}>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Home')}>
            <Image source={require('./assets/back.png')} style={{transform: [{ rotate: '180deg' }]}}/>
          </TouchableOpacity>
        </View>
        <View style={{flex: 5, justifyContent: 'center', alignItems: 'center', marginBottom: '20%'}}>
          <Image source={require('./assets/check.png')} style={{width: 350, height: 350}}/>
          <Text style={styles.textEntry}> {i18n.t('newEntry')} </Text>
          <Text style={styles.textEntryText}> {i18n.t('admin')} </Text>
        </View>
      </View>
    );
  }
 }

  class Search extends React.Component{
    constructor(props){
      super(props);
      this.state={
        search: '',
        buildings: [],
        arrayholder: []
      };
      //this.arrayholder = [];
    }

    componentDidMount(){
      if(this.props.route.params.language === 'en'){
        fetch('https://jsonkeeper.com/b/CDFD')
          .then(res => res.json())
          .then(data => {
            this.setState({ buildings: data.buildings, arrayholder: data.buildings }
            )
          })
        .catch(console.error)
      }
      else if(this.props.route.params.language === 'sk'){
        fetch('https://jsonkeeper.com/b/VP53')
          .then(res => res.json())
          .then(data => {
            this.setState({ buildings: data.buildings, arrayholder: data.buildings }
            )
          })
        .catch(console.error)
      }
    }

    searchFilterFunction = (text) => {
      const newData = this.state.arrayholder.filter( function(item) {
        const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      this.setState({buildings: newData, search: text});
    } 

    ListViewItemSeparator = () =>{
      return ( <View style={{height: 10, width: '100%', backgroundColor: '#546A7B'}}/> );
    }

    render(){
      return(
        <View style={{flex: 1, backgroundColor: '#546A7B', justifyContent: 'center', alignItems: 'center'}}>
          <View style={{width: '100%'}}>
            <SearchBar round lightTheme={true} searchIcon={{size: 25}} onChangeText={ (text) => this.searchFilterFunction(text) } 
              onClear={(text) => this.searchFilterFunction('')} placeholder={i18n.t('search')} value={this.state.search}/>
          </View>
          <FlatList data={this.state.buildings} ItemSeparatorComponent={this.ListViewItemSeparator} renderItem={ ({item}) => (
            <View style={{borderColor: 'white', borderRadius: 25, borderWidth: 1, padding: 10, width: '100%'}}>
              <TouchableOpacity onPress={ () => { this.props.navigation.navigate('Entry', {
                itemID: item.id, name: item.name, func: item.function, address: item.address, architect: item.architect,
                realization: item.realization, image: item.img, description: item.description } )
                }
              }>
                <Text style={styles.textEntryText}>{item.name}</Text>
                <Text style={styles.textSearchDesc}>  {item.architect}</Text>
                <Text style={styles.textSearchDesc}>  {item.address}</Text>
                <Text style={styles.textSearchDesc}>  {item.function}</Text>
              </TouchableOpacity>
            </View> 
           )}
            enableEmptySections={true} keyExtractor={(item, index) => index.toString()} style={{ marginTop: 11 }}
          />
        </View>
      );
    }
  }


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