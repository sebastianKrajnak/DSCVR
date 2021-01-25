import 'react-native-gesture-handler';
import React from 'react';
import { View, Image } from 'react-native';

export default class FavList extends React.Component{
    /*
     try saving favlist[] into async storage and then fetching it from there into state on Home, FavList and Entry pages and using the itemID as positions in the array
    */
    render(){
     //const {itemzID, name, description, architect, address, func} =  this.props.route.params;
      return(
        <View style={{flex: 1, width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center'}}>
          <Image source={require('../assets/favs.jpg')} style={{height: '95%', width: '100%'}}/>
        </View>
      );
    }
  }