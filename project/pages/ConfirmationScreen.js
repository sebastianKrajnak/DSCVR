import 'react-native-gesture-handler';
import React from 'react';
import { View, TouchableOpacity, Text, Image } from 'react-native';
import styles from "../Styles"
import i18n from '../i18n';

export default class ConfirmationScreen extends React.Component{
    render(){
      return(
        <View style={{flex: 1, backgroundColor: '#546A7B', justifyContent: 'center', alignItems: 'center'}}>
          <View style={{flex: 0.5, height: 40, margin: 15, marginRight: '80%'}}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Home')}>
              <Image source={require('../assets/back.png')} style={{transform: [{ rotate: '180deg' }]}}/>
            </TouchableOpacity>
          </View>
          <View style={{flex: 5, justifyContent: 'center', alignItems: 'center', marginBottom: '20%'}}>
            <Image source={require('../assets/check.png')} style={{width: 350, height: 350}}/>
            <Text style={styles.textEntry}> {i18n.t('newEntry')} </Text>
            <Text style={styles.textEntryText}> {i18n.t('reload')} </Text>
          </View>
        </View>
      );
    }
   }