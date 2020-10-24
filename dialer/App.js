import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Pressable, Image, Linking} from 'react-native';


export default function App() {

  const [phoneNumber, setPhoneNumber] = useState("");
  const [callActive, setCall] = useState(false);

  const toggleCall = function() {
    setCall(!callActive)
    if(!callActive)
      Linking.openURL(`tel:${phoneNumber}`)
  };

  const showBackspace = function() {
    if (phoneNumber.length > 0) {
      return(
        <Pressable onPress={() => { setPhoneNumber(phoneNumber.slice(0, -1))}} onLongPress={() => { setPhoneNumber("")}}>
          <Image source={backspace} style={styles.image}/>
        </Pressable>
      );
    }
    else
      return null;
  };

  let backspace=require("./assets/backspace.png")
  let rows=[]
  let nums=[[1,2,3], [4,5,6], [7,8,9], ['*',0,'#']]
  let chars=[['O_O','ABC','DEF'], ['GHI','JKL','MNO'], ['PQRS','TUV','WXYZ'], ['','+','']]

  var image = callActive
    ? require("./assets/phoneEnd.png")
    : require("./assets/phone.png");

  for(let i=0;i<4;i++){
    let row=[]
    for(let j=0;j<3;j++){
      row.push(<TouchableOpacity key={`button-${i}-${j}`} style={styles.button} onPress={ () => { setPhoneNumber(phoneNumber + nums[i][j])} } onLongPress={ () => { nums[i][j]==0 ? setPhoneNumber(phoneNumber + '+') : null} }>
        <Text style={styles.buttonText}>{nums[i][j]}</Text>
        <Text style={styles.buttonTextSmaller}>{chars[i][j]}</Text>
      </TouchableOpacity>)
    }
    rows.push(<View style={styles.row}>{row}</View>)
  }

  return (
    <View style={styles.container}>
      <View style={styles.bar}>
        <Text color='white'>Phone</Text>
      </View>

      <View style={styles.display}>
        <Text style={styles.displayText}>{phoneNumber}</Text>
      </View>

      <View style={styles.numpad}>
          <View style={styles.numbers}>
            {rows}
          </View>
      </View>

      <View style={styles.bottomBar}>
        <Pressable style={callActive == false ? styles.callButtonGreen : styles.callButtonRed} onPress={toggleCall}>
          <Image source={image} style={styles.image}/>
        </Pressable>
        {showBackspace()}
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  bar: {
    flex: 1,
    backgroundColor: 'limegreen',
    width: '100%',
    paddingTop: 15,
    paddingLeft: 15,
  },

  display:{
    flex:2,
    backgroundColor: 'white',
    justifyContent: 'center',
  },

  numpad:{
    flex: 6,
    flexDirection: 'row',
    backgroundColor: 'blue',
  },

  numbers:{
    flex: 1,
    backgroundColor: 'white'
  },

  bottomBar:{
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginLeft: '27%'
  },

  row:{
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },

  displayText:{
    color: 'black',
    fontWeight: 'bold',
    fontSize: 40,
    textAlign: 'center',
  },

  barText:{
    color: 'white',
    fontSize: 15
  },

  button:{
    flex: 1,
    alignItems: 'center',
    alignSelf: 'stretch',
    justifyContent: 'center',
    borderWidth: 0.3,
    borderColor: 'gray'
  },

  buttonText:{
    fontSize: 30
  },

  buttonTextSmaller:{
    fontSize: 10,
    color: 'gray'
  },

  image: {
    flex: 1,
    width: 30,
    height: 30,
    resizeMode: 'contain'
},

  callButtonGreen:{
    width: 100,
    height: '80%',
    backgroundColor: 'limegreen',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    alignItems: 'center',
    alignSelf: 'center'
  },

  callButtonRed:{
    width: 100,
    height: '80%',
    backgroundColor: 'red',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    alignItems: 'center',
    alignSelf: 'center'
  },

});
