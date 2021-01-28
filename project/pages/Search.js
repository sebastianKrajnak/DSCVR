import 'react-native-gesture-handler';
import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import styles from "../Styles"
import i18n from '../i18n';
import { SearchBar } from 'react-native-elements';
import { FlatList } from 'react-native-gesture-handler';

export default class Search extends React.Component{
    constructor(props){
      super(props);
      this.state={
        search: '',
        buildings: [],
        arrayholder: []
      };
    }

    componentDidMount(){    //fetch data from JSON stored online
      if(this.props.route.params.language === 'en'){
        fetch('https://jsonkeeper.com/b/FGKR')
          .then(res => res.json())
          .then(data => {
            this.setState({ buildings: data.buildings, arrayholder: data.buildings }
            )
          })
        .catch(console.error)
      }
      else if(this.props.route.params.language === 'sk'){
        fetch('https://jsonkeeper.com/b/NWIW')
          .then(res => res.json())
          .then(data => {
            this.setState({ buildings: data.buildings, arrayholder: data.buildings }
            )
          })
        .catch(console.error)
      }
    }

    searchFilterFunction = (text) => {    //searches the inputed text for names and updates the state of the buildings array accordingly so it displays the searched entry
      const newData = this.state.arrayholder.filter( function(item) {
        const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      this.setState({buildings: newData, search: text});
    } 

    ListViewItemSeparator = () =>{    //makes space between list items
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