import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Linking
} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';

const App = () => {
  const scanner = useRef(null);
  const [scan, setScan] = useState(false);
  const [result, setResult] = useState(null);

  useEffect(() =>{
      setResult(null);
  }, [])

  const onSuccess = e => {
    setResult(e);
    setScan(false);

    if(e.data.substring(0,4) === 'http'){
      alert(e.data)
    }
    // Linking.openURL(e.data).catch(err =>
    //   console.error('An error occured', err)
    // );
  };

    return !scan ? (
      <View style={styles.container}>
          { result && <Text>{JSON.stringify(result, null, 2)}</Text> }
          <TouchableOpacity style={styles.buttonTouchable} onPress={()=> setScan(true)}>
            <Text style={styles.buttonText}>START SCAN</Text>
          </TouchableOpacity>
      </View>

    ) : (
      <QRCodeScanner
        onRead={onSuccess}
        ref={scanner}
        reactivate={true}
        showMarker={true}
        bottomContent={
          <>
            <TouchableOpacity style={styles.buttonTouchable} 
              onPress={() => scanner.current.reactive() }>
              <Text style={styles.buttonText}>OK. Got it!</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonTouchable} onPress={()=> setScan(false)}>
              <Text style={styles.buttonText}>STOP</Text>
            </TouchableOpacity>
          </>
        }
      />
    )
}

const styles = StyleSheet.create({
  container:{
      flex:1,
      justifyContent:'center',
      alignItems:'center',
      flexDirection:'column'
  },  
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777'
  },
  textBold: {
    fontWeight: '500',
    color: '#000'
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)'
  },
  buttonTouchable: {
    padding: 16
  }
});

export default App;