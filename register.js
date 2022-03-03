import { StatusBar } from 'expo-status-bar';
import React from 'react';
import axiosInstance from './axios';
import { StyleSheet, Text, View, Pressable, TextInput } from 'react-native';
import { Link } from 'react-router-dom';
import { FontAwesome } from '@expo/vector-icons';

export default function Register() {
    const [email, onChangeEmail] = React.useState("");
    const [user, onChangeUser] = React.useState("");
    const [pass, onChangePass] = React.useState("");
    
    function register() {
      axiosInstance
          .post(`user/register/`, {
              email: email,
              user_name: user,
              password: pass,
          })
          .then((res) => {
              console.log(res);
          });
    }
    
    return(
        <View style={styles.container}>
            <View style={styles.form}>
                <FontAwesome name="user-o" size={150} color="black" />
                <TextInput style={styles.input} placeholder="Email" placeholderTextColor="#9a73ef" autoCorrect={false} onChangeText={onChangeEmail} value={email} />
                <TextInput style={styles.input} placeholder="Username" placeholderTextColor="#9a73ef" autoCorrect={false} onChangeText={onChangeUser} value={user} />
                <TextInput style={styles.input} placeholder="Password" placeholderTextColor="#9a73ef" secureTextEntry autoCorrect={false} onChangeText={onChangePass} value={pass} />
                <Pressable style={styles.button} onPress={ (event) => {event.preventDefault(); register(); }}><Text style={{textAlign: 'center'}}>Register</Text></Pressable>         
            </View>
        </View>
    );

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