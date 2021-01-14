import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    //#546A7B - grey
    //#884AB2 - purple
    
    container: {
      flex: 1,
      ...StyleSheet.absoluteFillObject,
      //height: "100%",
      
    },
  
    map: {
      flex: 1,
      ...StyleSheet.absoluteFillObject,
    },
  
    buttonNewEntry: {
      position: 'absolute',
      alignItems: 'center',
      backgroundColor: '#546A7B',
      paddingBottom: 4,
      width: 41,
      height: 41,
      borderRadius: 100,
      marginLeft: 224,
      justifyContent: 'center',
    },
  
    searchBar: {
      height: 41,
      width: 200,
      backgroundColor: '#546A7B',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 20,
      paddingBottom: 2,
      paddingRight: 30 
    },
  
    buttonRow: {
      position: 'absolute',
      height: 42,
      flexDirection: "row",
      marginTop: '140%',
      marginLeft: '21%',
      marginRight: 21
    },
  
    buttonLocation: {
      width: 41,
      height: 41,
      backgroundColor: "#546A7B",
      borderRadius: 100,
      justifyContent: 'center',
      alignItems: 'center',
    },
  
    buttonMenu: {
      width: 41,
      height: 41,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: "#546A7B",
      borderRadius: 100
    },
  
  }); 