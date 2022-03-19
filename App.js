import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { useFonts } from 'expo-font';
import { MaterialCommunityIcons, Entypo } from '@expo/vector-icons';

import Main from './main.js';
import Register from './register.js';
import Login from './login.js';
import Profile from './src/components/Profile.js';
import File from './src/components/Files';
import NavBar from './src/components/NavBar';
import SideBar from './src/components/SideBar.js';

export default function App() {

  const [loaded] = useFonts({
    Arial: require('./assests/fonts/arial.ttf'),
    Calibri: require('./assests/fonts/CALIBRI.ttf'),
    Montserrat: require('./assests/fonts/Montserrat.ttf'),
    OpenSans: require('./assests/fonts/OpenSans.ttf'),
    TimesNewRoman: require('./assests/fonts/times.ttf'),
  });

  //window.onunload = () => {
  //  window.localStorage.clear()
  //}

  return (
    <Router>
      <View style={styles.container}>        
        <NavBar />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="Profile" element={<Profile />} />
          <Route path="LogIn" element={<Login />} />
          <Route path="Files" element={<File />} />
          <Route path="Register" element={<Register />} />
        </Routes>    
      </View>
    </Router>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#F5F5F5',
  },
});
