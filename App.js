import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useMemo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';
import { Route, BrowserRouter as Router, Routes, Link } from 'react-router-dom';

import Main from './main.js';
import Register from './register.js';
import Login from './login.js';
import CRUD from './crud.js';
import Profile from './src/components/Profile.js';
import File from './src/components/Files';
import NavBar from './src/components/NavBar';

export default function App() {
  const [navOpen, setNavOpen] = useState(false);

  //window.onunload = () => {
  //  window.localStorage.clear()
  //}

  return (
    <Router>
      <View style={styles.container}>
        <NavBar size={navOpen} />
        <Pressable onPress={ (event) => {event.preventDefault(); setNavOpen(!navOpen);}}><Text style={{color: '#fff'}}>{'>'}</Text></Pressable>
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
    backgroundColor: '#000',
    flexDirection: 'row',
  }
});
