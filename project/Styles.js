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

    containerEntry: {
      flex: 1,
      backgroundColor: "#546A7B"
    },

    rectName: {
      height: 120,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: "#884AB2",
      padding: 5
    },

    name: {
      fontFamily: "sen-regular",
      color: "white",
      fontSize: 28,
      textAlign: "center",
    },

    buttonFav: {
      marginTop: '-7%',
      marginLeft: '80%',
      width: 51,
      height: 51,
      backgroundColor: "white",
      borderRadius: 100,
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: 2
    },
    
    rect: {
      flex: 1,
      height: 120
    },

    group: {
      flex: 1,
      margin: 20,
      justifyContent: 'space-around'
    },

    textEntry: {
      fontFamily: "sen-regular",
      color: "white",
      fontSize: 20
    },
    
    image: {
      flex: 1, 
      width: '100%', 
      height: 300, 
      backgroundColor: 'red'
    },

    textEntryText: {
      fontFamily: "sen-regular",
      color: "white",
      fontSize: 16
    },

    imageAdd: {
      flex: 1, 
      width: '100%', 
      height: 200, 
      backgroundColor: '#884AB2',
      justifyContent: 'center',
      alignItems: 'center'
    },

    buttonNewEntryRow: {
      flex: 1,
      marginBottom: '2%',
      marginLeft: '15%',
      alignItems: 'flex-start',
      justifyContent: 'space-evenly'
    },

    buttonCancel: {
      width: 51,
      height: 51,
      borderRadius: 100,
      backgroundColor: '#884AB2',
      justifyContent: 'center',
      alignItems: 'center'
    },

    buttonConfirm: {
      marginTop: -51,
      marginLeft: '65%',
      width: 51,
      height: 51,
      borderRadius: 100,
      backgroundColor: '#884AB2',
      justifyContent: 'center',
      alignItems: 'center'
    },

    animatedMenu: {
      flex: 1,
      backgroundColor: '#546A7B',
      padding: 10,
    },

    textInput: {
      height: 40,
      borderColor: 'white',
      borderWidth: 1,
      borderRadius: 20,
      fontFamily: 'sen-regular'
    },
    
    textInputDesc: {
      height: 130,
      borderColor: 'white',
      borderWidth: 1,
      borderRadius: 20,
      fontFamily: 'sen-regular'
    },

    textSearchDesc: {
      fontFamily: "sen-regular",
      color: "white",
      fontSize: 14,
    }
  }); 