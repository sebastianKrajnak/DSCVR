import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View , Image} from 'react-native';
import { Magnetometer } from 'expo-sensors';

export default function App() {
  Magnetometer.setUpdateInterval(200);

  const [data, setData] = React.useState({
    x: 0,
    y: 0,
    z: 0,
  });
  const {x, y, z} = data;
  const [subscription, setSubscription] = React.useState(null);

  React.useEffect(() => {
    toggle();
    return () => {
      unsubscribe();
    };
  }, []);

  const toggle = () => {
    if (subscription)
      unsubscribe();
    else
      subscribe();
  };

  const subscribe = () => {
    setSubscription(
      Magnetometer.addListener(result => {
        setData(result);
      })
    );
  };

  const unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  var degtorad = Math.PI / 180; // Degree-to-Radian conversion

  function compassHeading( x, y, z ) {

    var _x = y  ? y  * degtorad : 0; // beta value
    var _y = z ? z * degtorad : 0; // gamma value
    var _z = x ? x * degtorad : 0; // alpha value

    var cX = Math.cos( _x );
    var cY = Math.cos( _y );
    var cZ = Math.cos( _z );
    var sX = Math.sin( _x );
    var sY = Math.sin( _y );
    var sZ = Math.sin( _z );

    // Calculate Vx and Vy components
    var Vx = - cZ * sY - sZ * sX * cY;
    var Vy = - sZ * sY + cZ * sX * cY;

    // Calculate compass heading
    var compassHeading = Math.atan( Vx / Vy );

    // Convert compass heading to use whole unit circle
    if( Vy < 0 ) {
      compassHeading += Math.PI;
    } else if( Vx < 0 ) {
      compassHeading += 2 * Math.PI;
    }

    return compassHeading * ( 180 / Math.PI ); // Compass Heading (in degrees)
  }
  
  var angle = compassHeading(x, y, z)
  //console.log(angle);

  return (
    <View style={styles.container}>
      <View style={styles.bar}>
        <Text style={{fontSize: 20, color: 'white'}}>Compass</Text>
      </View>
      <View style={{flex: 3, marginTop: 80}}>
        <Image
          style={{ width: 300, height: 300, transform: [{ rotate: angle + "deg"}] }}
          source={require("./assets/compass.png")}
        />
      </View>
      <View style={{flex: 1}}>
        <Text style={styles.text}> {Math.round(angle)} </Text>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFE",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "column"
  },

  text: {
    flex: 1,
    marginTop: 25,
    fontSize: 40,
    justifyContent: "center",
    alignItems: "center",
    opacity: 0.5
  },

  bar: { 
    flex: 0.5,
    backgroundColor: 'teal',
    width: '100%',
    alignItems:"flex-start",
    justifyContent: "space-around",
    paddingLeft: 25

  },
 
});


