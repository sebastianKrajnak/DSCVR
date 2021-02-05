import 'react-native-gesture-handler';
import React from 'react';
import { View, TouchableOpacity, Text, Image, ScrollView } from 'react-native';
import styles from "../Styles"
import i18n from '../i18n';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class EntryScreen extends React.Component{
    constructor(props){
      super(props);
      this.getData();
      this.state={
        favourites: []
      }
    }

    getData = async () =>{  //checks and stores data about favourites from AsyncStorage
      try{
        const temp = await AsyncStorage.getItem('favourites')
        const tempParsed = JSON.parse(temp)
        
        if(tempParsed !== null){
          this.setState({favourites: tempParsed})
          //console.log('start:' + this.state.favourites)
        }
      } catch(e){
        console.log('ERROR: ' + e)
      }
    }

    toggleFavourite = async (itemID) => {
      let tempArray = [];
      tempArray = this.state.favourites
      //console.log('TEMP: ' + tempArray)

      if(this.state.favourites[itemID] === true){
        tempArray.splice(itemID, 1, false)
        await this.setState({favourites: tempArray})
        await AsyncStorage.setItem('favourites', JSON.stringify(this.state.favourites))
      }
      else if(tempArray[itemID] === false){
        tempArray.splice(itemID, 1, true)
        await this.setState({favourites: tempArray})
        await AsyncStorage.setItem('favourites', JSON.stringify(this.state.favourites))
      }
      else{   //gets called if it hasn't been decided yet, i.e default state is null, better known as false
        tempArray.splice(itemID, 1, true)
        await this.setState({favourites: tempArray})
        await AsyncStorage.setItem('favourites', JSON.stringify(this.state.favourites))
      }
      //console.log('STATE: '+ this.state.favourites)
    }
 
    favIcon = (itemID) => {   //changes the icon displayed depending if the entry is in array of favourites or not
      if(this.state.favourites[itemID] === true){
        return (<Image source={require('../assets/heartFull.png')} style={{width: 35, height:35}}/>)
      }
      else{
        return (<Image source={require('../assets/heartEmpty.png')} style={{width: 35, height:35}}/>)
      }
    }
 
    render(){
      const {itemID, name, description, architect, address, image, func, realization} =  this.props.route.params;
       
      return(
       <View style={styles.containerEntry}>
         <ScrollView style={{flex: 1}}>
 
           <View style={styles.image}>
             <Image source={{uri: `data:image/jpg;base64,${image}`}} style={{width: '100%', height: '100%'}}/>
           </View>
 
           <View style={styles.rect}>
             <View style={styles.rectName}>
               <Text style={styles.name}>{name}</Text>
             </View>
             <TouchableOpacity style={styles.buttonFav} onPress={() => this.toggleFavourite(itemID)}>
               {this.favIcon(itemID)}
             </TouchableOpacity>
           </View>
 
           <View style={styles.group}>
             <Text style={styles.textEntry}>{i18n.t('architect')}</Text>
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