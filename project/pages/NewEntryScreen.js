import 'react-native-gesture-handler';
import React from 'react';
import { View, TouchableOpacity, Text, Image, TextInput, ScrollView } from 'react-native';
import styles from "../Styles"
import i18n from '../i18n';

export default class NewEntryScreen extends React.Component{
    render(){
     return(
       <View style={styles.containerEntry}>
         <ScrollView style={{flex: 1}}>
 
           <View style={styles.imageAdd}>
             <TouchableOpacity>
               <Image source={require('../assets/plus.png')} /* onPress={func to load image from gallery or camera and then prepare it for upload to database}*//>
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
               <Image style={{width: 55, height: 55}} source={require('../assets/cancel.png')}/>
             </TouchableOpacity>
             <TouchableOpacity style={styles.buttonConfirm} onPress={ () => { 
               /* here would be a magical function to send the new entry to database*/
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