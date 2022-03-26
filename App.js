import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { useFonts } from 'expo-font';
import { Feather } from '@expo/vector-icons';

import Main from './main.js';
import Register from './register.js';
import Login from './login.js';
import Profile from './src/components/Profile.js';
import File from './src/components/Files';
import NavBar from './src/components/NavBar';
import SideBar from './src/components/SideBar.js';

export default function App() {
  const [dark, setDark] = useState(getMode());

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
      <View style={[styles.container,{backgroundColor: dark ? "#A9A9A9" : '#F5F5F5'}]}>     
        <NavBar mode={dark} />
        <Pressable onPress={() => {localStorage.setItem("DarkMode", !dark)}}>
          {dark ? <Feather name="moon" size={24} color="darkblue" /> : <Feather name="sun" size={24} color="yellow" />}
        </Pressable>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="Profile" element={<Profile mode={dark} />} />
          <Route path="LogIn" element={<Login mode={dark} />} />
          <Route path="Files" element={<File mode={dark} />} />
          <Route path="Register" element={<Register mode={dark} />} />
        </Routes>     
      </View>
    </Router>
  );
}

function getMode(){
  let mode = localStorage.getItem("DarkMode");
  if (mode == null || mode == "false"){
    return false;
  }
  return true;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
});
