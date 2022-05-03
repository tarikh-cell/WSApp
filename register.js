import React from 'react';
import axiosInstance from './axios';
import { StyleSheet, Text, View, Pressable, TextInput } from 'react-native';
import { Link, useNavigate } from 'react-router-dom';
import { AntDesign } from '@expo/vector-icons';

export default function Register({ mode }) {
    const [email, onChangeEmail] = React.useState("");
    const [user, onChangeUser] = React.useState("");
    const [pass, onChangePass] = React.useState("");
    const [error, setError] = React.useState(false);
    let navigate = useNavigate();
    
    function register() {
      axiosInstance
          .post(`user/register/`, {
              email: email,
              user_name: user,
              password: pass,
          })
          .then((res) => {
              console.log(res);
              navigate("/Login");
          }).catch((err) => {
            setError(true);
          });;;
    }
    
    return(
        <View style={styles.container}>
          <View style={[styles.form, {backgroundColor: mode ? 'rgba(0,0,0,0.9)' : 'rgba(255,255,255,0.9)'}]}>
              <View style={styles.background}>
                <AntDesign name="user" size={60} color="black" />
              </View>
              <View style={styles.line}></View>
              <Text style={{marginBottom: '1em', color: "#9a73ef"}}>Please enter an Email, Username and Password to Register.</Text>
              <TextInput style={[styles.input,{color: mode ? 'white' : 'black'}]} placeholder="Email" placeholderTextColor="#9a73ef" autoCorrect={false} onChangeText={onChangeEmail} value={email} />
              <TextInput style={[styles.input,{color: mode ? 'white' : 'black'}]} placeholder="Username" placeholderTextColor="#9a73ef" autoCorrect={false} onChangeText={onChangeUser} value={user} />
              <TextInput style={[styles.input,{color: mode ? 'white' : 'black'}]} placeholder="Password" placeholderTextColor="#9a73ef" secureTextEntry autoCorrect={false} onChangeText={onChangePass} value={pass} />
              { error ? <Text style={{color: 'red'}}>Invalid register details.</Text> : null}
              <Pressable style={styles.button} onPress={ (event) => {event.preventDefault(); register(); }}><Text style={{textAlign: 'center'}}>Register</Text></Pressable>         
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
      width: '50%',
      height: '75%',
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