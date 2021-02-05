import 'react-native-gesture-handler';
import React from 'react';
import { View, TouchableOpacity, Text, Image, TextInput, ScrollView, Alert } from 'react-native';
import styles from "../Styles"
import i18n from '../i18n';
import Geolocation from '@react-native-community/geolocation';
import { launchImageLibrary } from 'react-native-image-picker';

const baseURL = 'https://parseapi.back4app.com/classes/Buildings';
const headers = {
  'X-Parse-Application-Id': 'dYLdXM6xTfFUzBXLOHIfiCelnaTMq31JjKnPpdpq',
  'X-Parse-REST-API-Key': 'EhdHbWqYXvJ3YqlvsAOXEQHiafcfnF8J8XsSummG',
  'Content-Type': 'application/json'
}
const baseSkURL = 'https://parseapi.back4app.com/classes/BuildingsSK';

export default class NewEntryScreen extends React.Component{
    constructor(props){
      super(props);
      this.state={
        name: '',
        architect: '',
        address: '',
        func: '',
        realization: '',
        about: '',
        image: '',
        IDs: this.props.route.params.IDs,
        language: this.props.route.params.language,
        latitude: 0,
        longitude: 0
      }
    }

    componentDidMount(){
      this.locateCurrentPosition(); //call location func when component mounts because when it's first called for some reason it sets both lat and long to 0
    }

    chooseImage = () => {
      launchImageLibrary({
        mediaType: 'photo',
        includeBase64: true,
        quality: 0.25
      },
        (response) => {
          this.setState({image: response.base64})
        }
      )
    }

    locateCurrentPosition = () => {
      Geolocation.getCurrentPosition(
        position =>{
          //console.log(JSON.stringify(position));
           this.setState({latitude: position.coords.latitude})
           this.setState({longitude: position.coords.longitude})
          
         },
        error => Alert.alert(error.message),
        {enableHighAccuracy: true, timeout: 10000, maximumAge: 1000}
      )
      console.log('lat: ' + this.state.latitude + ' long: ' + this.state.longitude)
    }
    
    post = async(newEntry) => {   //sends a new entry to the selected DB based on the language of the app
      if(this.state.language === 'en'){
        const response = await fetch(baseURL, {
          headers,
          method: "POST",
          body: JSON.stringify(newEntry)
        });

        const data = await response.json();
        console.log(data);
      }
      else if(this.state.language === 'sk'){
        const response = await fetch(baseSkURL, {
          headers,
          method: "POST",
          body: JSON.stringify(newEntry)
        });
        
        const data = await response.json();
        console.log(data);
      }
    }

    render(){
      const newEntry = {
        buildingID: Math.max(...this.state.IDs) + 1,    //since IDs and positions in indexes of favs are the same, check for the highest id number and add one when creating a new entry
        latitude: this.state.latitude,
        longitude: this.state.longitude,
        name: this.state.name,
        function: this.state.func,
        address: this.state.address,
        architect: this.state.architect,
        realization: this.state.realization,
        img: this.state.image,
        description: this.state.about
      }
      
     return(
       <View style={styles.containerEntry}>
         <ScrollView style={{flex: 1}}>
 
           <View style={styles.imageAdd}>
             <TouchableOpacity onPress={ () => this.chooseImage()}>
               <Image source={require('../assets/plus.png')} />
             </TouchableOpacity>
           </View>
 
           <View style={styles.group}>
             <Text style={styles.textEntry}> {i18n.t('location')} </Text>
               <TouchableOpacity style={styles.locatePos} onPress={ () => {this.locateCurrentPosition(); Alert.alert(i18n.t('posAlert')) } }>
                 <Text style={styles.textEntryText}> {i18n.t('locatePos')} </Text>
               </TouchableOpacity>
             <Text style={styles.textEntry}> {i18n.t('name')} </Text>
               <TextInput style={styles.textInput} placeholder={i18n.t('typeHere')} onChangeText={(text) => this.setState({name: text})} placeholderTextColor={`#ffffff`} textAlign={'center'}/>
             <Text style={styles.textEntry}> {i18n.t('architect')} </Text>
               <TextInput style={styles.textInput} placeholder={i18n.t('typeHere')} onChangeText={(text) => this.setState({architect: text})} placeholderTextColor={`#ffffff`} textAlign={'center'}/>
             <Text style={styles.textEntry}> {i18n.t('address')} </Text>
               <TextInput style={styles.textInput} placeholder={i18n.t('typeHere')} onChangeText={(text) => this.setState({address: text})} placeholderTextColor={`#ffffff`} textAlign={'center'}/>
             <Text style={styles.textEntry}> {i18n.t('func')} </Text>
               <TextInput style={styles.textInput} placeholder={i18n.t('typeHere')} onChangeText={(text) => this.setState({func: text})} placeholderTextColor={`#ffffff`} textAlign={'center'}/>
             <Text style={styles.textEntry}> {i18n.t('realization')} </Text>
               <TextInput style={styles.textInput} placeholder={i18n.t('typeHere')} onChangeText={(text) => this.setState({realization: text})} placeholderTextColor={`#ffffff`} textAlign={'center'}/>
             <Text style={styles.textEntry}> {i18n.t('about')} </Text>
               <TextInput style={styles.textInputDesc} placeholder={i18n.t('typeHere')} onChangeText={(text) => this.setState({about: text})} multiline={true} placeholderTextColor={`#ffffff`} textAlign={'center'}/>
           </View>
 
           <View style={styles.buttonNewEntryRow}>
             <TouchableOpacity style={styles.buttonCancel} onPress={ () => {this.props.navigation.goBack()} }>
               <Image style={{width: 55, height: 55}} source={require('../assets/cancel.png')}/>
             </TouchableOpacity>
             <TouchableOpacity style={styles.buttonConfirm} onPress={ () => { 
               this.post(newEntry);
               this.props.navigation.navigate('ConfirmationScreen')} 
             }>
               <Image style={{width: 55, height: 55}} source={require('../assets/confirm.png')}/>
             </TouchableOpacity>
           </View>
         </ScrollView>
       </View>
     );
   }
  }