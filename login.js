import React from 'react';
import { Pressable, StyleSheet, Text, View, TextInput } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import axiosInstance from './axios';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
    const [user, onChangeUser] = React.useState("");
    const [pass, onChangePass] = React.useState("");
    let navigate = useNavigate();

    async function handleClick(user, pass) {
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
              
              navigate("/");
          });
    }
  
    return (
        <View style={styles.container}>
          <View style={styles.form}>
            <View style={styles.background}>
              <AntDesign name="user" size={60} color="black" />
            </View>
            <View style={styles.line}></View>
            <Text style={{marginBottom: '1em', color: "#9a73ef"}}>Please enter your username and password to login.</Text>
            <TextInput style={styles.input} placeholder="Username" placeholderTextColor="#9a73ef" autoCorrect={false} onChangeText={onChangeUser} value={user} /> 
            <TextInput style={styles.input} placeholder="Password" placeholderTextColor="#9a73ef" secureTextEntry autoCorrect={false} onChangeText={onChangePass} value={pass} />
            <Pressable style={styles.button} onPress={ (event) => {event.preventDefault(); handleClick(user, pass); }}><Text style={{textAlign: 'center', color: 'white'}}>LogIn</Text></Pressable>
            <Text style={{color: 'white'}}>Don't have an account? <Link to="/Register">Register</Link> here.</Text>         
          </View>
        </View>
    );
  }

const styles = StyleSheet.create({
    container: {
      justifyContent: 'center',
      alignItems: 'center',
      width: '90%'
    },
    form: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0,0,0,0.9)',
      width: '50%',
      height: '70%',
      borderRadius: '5px',
    }, 
    background: {
      backgroundColor: '#EE82EE',
      borderRadius: '50%',
      width: '6em',
      height: '6em',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: '1em',
    },
    input: {
      borderBottomWidth: '1.5px',
      borderColor: '#8B008B',
      width: '17em',
      height: '3em',
      padding: '5px',
      marginVertical: '1em',
      color: 'white'
    }, 
    button: {
      backgroundColor: '#4B0082',
      borderRadius: '20px',
      width: '8em',
      height: '2em',
      justifyContent: 'center',
      marginVertical: '1em',
    },
    line: {
      backgroundColor: '#D8BFD8',
      borderRadius: '50%',
      width: '50%',
      height: '1px',
      marginBottom: '2em',     
    }
  });