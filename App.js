import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Route, BrowserRouter as Router, Routes, Link } from 'react-router-dom';

import Main from './main.js';
import Register from './register.js';
import Login from './login.js';
import CRUD from './crud.js';
import Profile from './src/components/Profile.js';


import { FontAwesome } from '@expo/vector-icons';

export default function App() {
  return (
    <Router>
      <View style={styles.container}>
        <StatusBar style="auto" />
        <NavBar />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="Profile" element={<Profile />} />
        </Routes>
      </View>
    </Router>
  );
}

function NavBar() {
  return(
    <View style={styles.toolbar}>
      <Pressable style={styles.section}>
        <Link to="/Profile">
        <FontAwesome name="user-o" size={40} color="black" />
        <Text style={{}}>Profile</Text>   
        </Link>
      </Pressable>
      <Pressable style={styles.section}>
        <FontAwesome name="power-off" size={40} color="black" />
        <Text style={{}}>Mode</Text>    
      </Pressable>
      <Pressable style={styles.section}>
        <FontAwesome name="folder-o" size={40} color="black" />
        <Text style={{}}>Files</Text>    
      </Pressable>
    </View>
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
