import 'react-native-gesture-handler';
import React from 'react';
import { View, Text, TouchableOpacity, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FlatList } from 'react-native-gesture-handler';
import i18n from '../i18n';
import styles from "../Styles"

const baseURL = 'https://parseapi.back4app.com/classes/Buildings';
const headers = {
  'X-Parse-Application-Id': 'dYLdXM6xTfFUzBXLOHIfiCelnaTMq31JjKnPpdpq',
  'X-Parse-REST-API-Key': 'EhdHbWqYXvJ3YqlvsAOXEQHiafcfnF8J8XsSummG'
}
const baseSkURL = 'https://parseapi.back4app.com/classes/BuildingsSK';

export default class FavList extends React.Component{
  constructor(props){
    super(props);
    this.getData();
    this.state={
      favourites: [],
      buildings: [],
      arrayholder: [],
      indexes: []
    };
  }

  componentDidMount(){ //gets JSON buidling data
    if(this.props.route.params.language === 'en'){
      fetch(baseURL, { headers })
        .then(res => res.json())
        .then(data => {
          this.setState({buildings: data.results, arrayholder: data.results})
        })
        .catch(console.error)
    }
    else if(this.props.route.params.language === 'sk'){
      fetch(baseSkURL, { headers })
        .then(res => res.json())
        .then(data => {
          this.setState({buildings: data.results, arrayholder: data.results})
        })
        .catch(console.error)
    }
    this.checkFavouriteStatus();
  }

  getData = async () =>{  //gets data about favourites from AsyncStorage
    try{
      const temp = await AsyncStorage.getItem('favourites')
      const tempParsed = JSON.parse(temp)
      
      if(tempParsed !== null){  //index of item in favourites matches with building ID, this finds all the ID's of NON FAV buildings
        this.setState({favourites: tempParsed})
        let index = [];
        let idx = this.state.favourites.indexOf(false);
        while(idx !== -1){
         index.push(idx)
         idx = this.state.favourites.indexOf(false, idx + 1)
        }
        this.setState({indexes: index})
        //console.log('indexes: '+ this.state.indexes)
      }
    } catch(e){
      console.log('ERROR: ' + e)
    }
  }

  ListViewItemSeparator = () =>{  //makes a spacing between list items,  that's all
    return ( <View style={{height: 10, width: '100%', backgroundColor: '#546A7B'}}/> );
  }

  checkFavouriteStatus = async() => {
    const buildingsMapped = this.state.buildings.map( (item) => item.buildingID) //makes a new array of all building IDs
    let matches = [];
    //console.log('mapped ' + buildingsMapped)
    
    for(let i = 0; i < this.state.favourites.length; i++){  //checks if the building ID matches with the ID in the index array of favourites i.e. is finds which bulding is not faved
      let match = buildingsMapped.find(buildingID => buildingID===this.state.indexes[i])
      if(match !== undefined){
        matches.push(match) //if a match exists pushes it into array with stored matches
      }
    }
    const newData = this.state.arrayholder.filter(function (eachElem, index){ //filters out NON FAVed items and saves the state for later
      return matches.indexOf(index) == -1
    })
    this.setState({buildings: newData})
    //console.log('mathcesL: ' + matches)
  }

  render(){
    return(
      <View style={{flex: 1, backgroundColor: '#546A7B', justifyContent: 'center', alignItems: 'center'}}>

        <View style={{ height: 50, width: '100%', padding: 10}}>
          <Text style={styles.textEntry}>{i18n.t('list')}</Text> 
        </View>

        <Button title={'Refresh'} onPress={() => this.checkFavouriteStatus()}/>

        <FlatList data={this.state.buildings} ItemSeparatorComponent={this.ListViewItemSeparator} renderItem={({item}) => (
          <View style={{borderColor: 'white', borderRadius: 25, borderWidth: 1, padding: 10, width: '100%'}}>
            <TouchableOpacity onPress={ () => { this.props.navigation.navigate('Entry', {
              itemID: item.buildingID, name: item.name, func: item.function, address: item.address, architect: item.architect,
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