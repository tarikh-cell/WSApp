import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Pressable, StyleSheet, Text, View, TextInput } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import axiosInstance from './axios';

export default function Login() {
    const [user, onChangeUser] = React.useState("");
    const [pass, onChangePass] = React.useState("");
  
    return (
        <View style={styles.container}>
          <StatusBar style="auto" />
          <View style={styles.form}>
            <FontAwesome name="user-o" size={150} color="black" />
            <TextInput style={styles.input} placeholder="Username" placeholderTextColor="#9a73ef" autoCorrect={false} onChangeText={onChangeUser} value={user} />
            <TextInput style={styles.input} placeholder="Password" placeholderTextColor="#9a73ef" secureTextEntry autoCorrect={false} onChangeText={onChangePass} value={pass} />
            <Pressable style={styles.button} onPress={ (event) => {event.preventDefault(); handleClick(user, pass); }}><Text style={{textAlign: 'center'}}>LogIn</Text></Pressable>
          </View>
        </View>
    );
  }

function handleClick(user, pass) {
  axiosInstance
      .post(`token/`, {
          user_name: user,
          password: pass,
      })
      .then((res) => {
          localStorage.setItem('access_token', res.data.access);
          localStorage.setItem('refresh_token', res.data.refresh);
          localStorage.setItem('loggedIn', true);
          axiosInstance.defaults.headers['Authorization'] =
              'JWT ' + localStorage.getItem('access_token', res.data.access);
          console.log(res);
      });
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      height: '95%',
      marginTop: 15,
      justifyContent: 'center',
    },
    form: {
      alignItems: 'center',
    }, 
    input: {
      borderWidth: '1px',
      borderRadius: 5,
      padding: '5px',
      marginVertical: '1em',
    }, 
    button: {
      backgroundColor: 'lightblue',
      borderRadius: 5,
      width: '8em',
      height: '2em',
      justifyContent: 'center'
    }
  });