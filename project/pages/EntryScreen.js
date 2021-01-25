import 'react-native-gesture-handler';
import React from 'react';
import { View, TouchableOpacity, Text, Image, ScrollView } from 'react-native';
import styles from "../Styles"
import i18n from '../i18n';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class EntryScreen extends React.Component{
    constructor(props){
      super(props);
      this.state={
        favourites: [],
        isFavourite: false
      }
    }

    componentDidMount(){
      this.setState({favourites: AsyncStorage.getItem('favourites')})
    }

    toggleFavourite = ({itemID}) => {
      let tempArray = this.state.favourites;
      console.log(JSON.stringify(tempArray))
      if(tempArray[itemID - 1] === true){
        this.setState({isFavourite: false})
        tempArray[itemID -1 ] = false;
        this.setState({favourites: tempArray})
        AsyncStorage.setItem('favourites', this.state.favourites)
      }

      else if(tempArray[itemID - 1] === false){
        this.setState({isFavourite: true})
        tempArray[itemID - 1] = true;
        this.setState({favourites: tempArray})
        AsyncStorage.setItem('favourites', this.state.favourites)
      }
      else{
        this.setState({isFavourite: true})
        tempArray[itemID - 1] = true
        this.setState({favourites: tempArray})
      }
    }
 
    favIcon = () => {
     if(this.state.isFavourite){
       return (<Image source={require('../assets/heartFull.png')} style={{width: 35, height:35}}/>)
     }
     else{
       return (<Image source={require('../assets/heartEmpty.png')} style={{width: 35, height:35}}/>)
     }
    }
 
    render(){
      const {itemID, name, description, architect, address, image, func, realization} =  this.props.route.params;
      var encodedImage = encodeURI(image);
       
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
             <TouchableOpacity style={styles.buttonFav} onPress={() => this.toggleFavourite(itemID)}>
               {this.favIcon()}
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