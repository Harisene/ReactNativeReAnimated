//import liraries
import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';

// create a component
const Card = ({imagePath, screenName, navigation}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={()=>navigation.navigate(screenName)}>
      <Image style={styles.image} source={imagePath} />
      <View style={styles.subView}>
        <Text style={styles.text}>BASICS</Text>
      </View>
    </TouchableOpacity>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {},
  image: {
    height: 150,
    width: '100%',
    resizeMode: 'contain',    
  },

  subView: {
    marginTop: 100,
    alignSelf: 'center',
    position: 'absolute',
    backgroundColor: 'lightblue',
    height: 50,
    width: '96%',
    opacity:0.6,
    paddingHorizontal: 20,
    justifyContent:'center'
  },

  text:{
      fontSize: 20,
      color: 'black',
      fontWeight: 'bold',
      textAlign: 'center'
      

  }
});

//make this component available to the app
export default Card;
