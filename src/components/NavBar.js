import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';
import { Route, BrowserRouter as Router, Routes, Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../../axios';

import { Feather } from '@expo/vector-icons';

export default function NavBar({ mode, modeButton }) {
    const [ isLoggedIn, setLoggedIn ] = useState(null);

    useEffect( () => {
        setLoggedIn(localStorage.getItem('loggedIn'));
    }, [isLoggedIn])
  
    return(
      <View style={[styles.toolbar, {backgroundColor: mode ? "#000" : "FFF"}]}>
        { isLoggedIn === 'true' ? <NavSlot path="/Profile"  icon="user" txt="Profile" color={mode} /> : <NavSlot path="/LogIn"  icon="log-in" txt="LogIn" color={mode} />} 
        <NavSlot path="/" icon="feather" txt="Mode" color={mode} onPress={ (event) => {event.preventDefault(); toggleFullScreen();}} />
        <NavSlot path="/Files" icon="folder" txt="Files" color={mode} />
        { isLoggedIn === 'true' ?  <NavSlot path="/" icon="log-out" txt="LogOut" color={mode} onPress={ (event) => {event.preventDefault(); setLoggedIn(false); logout();}} /> : <></>}
        <NavSlot path="/" icon="layers" txt="Home" color={mode} />
        {modeButton}
      </View>
    );
  }
  
  function NavSlot(props) {
    const {path, icon, txt, color, ...otherprops} = props;
    const [ hover, setHover ] = useState(false);
    return (
      <Link to={path} style={{ textDecoration: 'none' }}>
          <Pressable onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} style={[styles.section,{borderRadius: '8px', backgroundColor: hover ? "#D8BFD8" : ""}]} {...otherprops} > 
            <Feather name={icon} size={24} color={color ? "white" : "black"} />
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
    localStorage.removeItem('postTitle');
    localStorage.removeItem('postID');
    localStorage.removeItem('user');
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
      padding: '5px',
      alignItems: 'center',
      borderRightColor: '#E5E5E5',
      borderRightWidth: '1px',
    }, 
    section: {
      marginBottom: '2em',
      padding: '5px',
    },
    text: {
      color: 'grey',
    }
  });
  