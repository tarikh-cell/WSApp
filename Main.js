import React from 'react';
import axiosInstance from './axios';
import { StyleSheet, View, Text, Button} from 'react-native';
import { StatusBar } from 'expo-status-bar';

class Main extends React.Component{

    requestData() {
        const apiUrl = 'http://127.0.0.1:8000/api/';
        fetch(apiUrl, {
            headers: new Headers({
                'Authorization': localStorage.getItem('access_token')
                ? 'JWT ' + localStorage.getItem('access_token')
                : null,
                'Content-Type': 'application/json',
            }),
        })
            .then((data) => data.json())
            .then((data) => {console.log(data)})
    }

    render(){
        return (
            <View style={styles.container}>
                <StatusBar style="auto" />
            </View>    
        );
    }
    
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#fff',
      width: '95%',
      height: '95%',
      borderRadius: 8,
      marginLeft: 65,
      marginTop: 15,
    },
});

export default Main;