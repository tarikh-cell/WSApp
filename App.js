import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';
import { Route, BrowserRouter as Router, Routes, Link } from 'react-router-dom';

import Main from './main.js';
import Register from './register.js';
import Login from './login.js';
import CRUD from './crud.js';
import Profile from './src/components/Profile.js';

import { FontAwesome } from '@expo/vector-icons';

function toggleFullScreen() {
  var elem = document.documentElement;
  elem.requestFullscreen();
}

export default function App() {
  

  return (
    <Router>
      <View style={styles.container}>
        <StatusBar style="auto" />
        <NavBar />
        <Pressable onPress={ (event) => {event.preventDefault(); toggleFullScreen();}}><Text>fewbkj</Text></Pressable>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="Profile" element={<Profile />} />
          <Route path="LogIn" element={<Login />} />
        </Routes>
      </View>
    </Router>
  );
}

function NavBar() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  return(
    <View style={styles.toolbar}>
      {isLoggedIn ?  <NavSlot path="/LogIn" icon="user-o" txt="LogIn" />
        : <NavSlot path="/Profile" icon="user-o" txt="Profile" /> }
      <NavSlot path="/" icon="power-off" txt="Mode" />
      <NavSlot path="/" icon="folder-o" txt="Files" />
    </View>
  );
}

function NavSlot(props) {
  const {path, icon, txt} = props;
  return (
    <Link to={path} style={{ textDecoration: 'none' }}>
          <Pressable style={styles.section}> 
          <FontAwesome name={icon} size={40} color="black" />
          <Text>{txt}</Text>   
          </Pressable>
    </Link>
  );
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
    width: '8em',
    height: '95%',
    marginTop: 15,
    alignItems: 'center'
  }, 
  section: {
    marginBottom: '2em',
  }
});
