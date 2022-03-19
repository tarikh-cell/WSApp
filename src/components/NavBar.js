import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';
import { Route, BrowserRouter as Router, Routes, Link } from 'react-router-dom';
import axiosInstance from '../../axios';

import { FontAwesome } from '@expo/vector-icons';

export default function NavBar() {
    const [ isLoggedIn, setLoggedIn ] = useState(null);

    useEffect( () => {
        setLoggedIn(localStorage.getItem('loggedIn'));
    }, [isLoggedIn])
  
    return(
      <View style={styles.toolbar}>
        { isLoggedIn === 'true' ? <NavSlot path="/Profile"  icon="user-o" txt="Profile" /> : <NavSlot path="/LogIn"  icon="sign-in" txt="LogIn" />} 
        <NavSlot path="/" icon="power-off" txt="Mode" onPress={ (event) => {event.preventDefault(); toggleFullScreen();}} />
        <NavSlot path="/Files" icon="folder-o" txt="Files" />
        { isLoggedIn === 'true' ?  <NavSlot path="/" icon="sign-out" txt="LogOut" onPress={ (event) => {event.preventDefault(); setLoggedIn(false); logout();}} /> : <></>}
        <NavSlot path="/" icon="home" txt="Home" />
      </View>
    );
  }
  
  function NavSlot(props) {
    const {path, icon, txt, ...otherprops} = props;
    return (
      <Link to={path} style={{ textDecoration: 'none' }}>
          <Pressable style={styles.section} {...otherprops} > 
            <FontAwesome name={icon} size={30} color="black" />
            <Text style={styles.text}></Text>   
          </Pressable>
      </Link>
    );
  }
  
  function logout() {
    const response = axiosInstance.post('user/logout/blacklist/', {
        refresh_token: localStorage.getItem('refresh_token'),
    });
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.setItem('loggedIn', false);
    axiosInstance.defaults.headers['Authorization'] = null;
    console.log(response);
  }

  function toggleFullScreen() {
    var elem = document.documentElement;
    elem.requestFullscreen();
  }
  
const styles = StyleSheet.create({
    toolbar: {
      padding: '1%',
      alignItems: 'center',
      borderRightColor: '#E5E5E5',
      borderRightWidth: '1px',
      backgroundColor: '#fff'
    }, 
    section: {
      marginBottom: '2em',
    },
    text: {
      color: 'grey',
    }
  });
  