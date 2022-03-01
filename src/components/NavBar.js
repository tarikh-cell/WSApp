import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';
import { Route, BrowserRouter as Router, Routes, Link } from 'react-router-dom';
import axiosInstance from '../../axios';

import { FontAwesome } from '@expo/vector-icons';

export default function NavBar({size, load}) {
    const [ isLoggedIn, setLoggedIn ] = useState(null);

    useEffect( () => {
        setLoggedIn(localStorage.getItem('loggedIn'));
    }, [isLoggedIn])
  
    return(
      <View style={[styles.toolbar, { display : size ? 'none' : '' }]}>
        { isLoggedIn === 'true' ? <NavSlot path="/Profile"  icon="user-o" txt="Profile" /> : <NavSlot path="/LogIn"  icon="sign-in" txt="LogIn" />} 
        <NavSlot path="/" icon="power-off" txt="Mode" onPress={ (event) => {event.preventDefault(); toggleFullScreen();}} />
        <NavSlot path="/Files" icon="folder-o" txt="Files" />
        <NavSlot path="/" icon="sign-out" txt="LogOut" onPress={ (event) => {event.preventDefault(); setLoggedIn(false); logout();}} />
        <NavSlot path="/" icon="home" txt="Home" />
      </View>
    );
  }
  
  function NavSlot(props) {
    const {path, icon, txt, ...otherprops} = props;
    return (
      <Link to={path} style={{ textDecoration: 'none' }}>
          <Pressable style={styles.section} {...otherprops} > 
            <FontAwesome name={icon} size={40} color="black" />
            <Text>{txt}</Text>   
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
    container: {
      flex: 1,
      backgroundColor: '#000',
      flexDirection: 'row',
    },
    toolbar: {
      marginRight: '5%', 
      backgroundColor: '#fff', 
      padding: '3%',
      height: '95%',
      marginTop: 15,
      alignItems: 'center'
    }, 
    section: {
      marginBottom: '2em',
    }
  });
  