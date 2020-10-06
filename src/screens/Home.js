//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Card from '../components/Card';

// create a component
const Home = ({navigation}) => {
    return (
        <View style={styles.container}>
            <ScrollView style={styles.scrollView}>
                <Card imagePath={require("../../assets/images/basics.jpg")} navigation={navigation} screenName = {"Basics"}/>
            </ScrollView>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {  
        flex:1,             
        alignItems: 'center',        
    },

    scrollView: {
        width: '100%'
    }
});

//make this component available to the app
export default Home;
