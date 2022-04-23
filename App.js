import React from 'react';
import { Pressable, StyleSheet, Text, View, Button } from 'react-native';
import { useState, useEffect } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { useFonts } from 'expo-font';
import { Feather } from '@expo/vector-icons';

import Main from './main.js';
import Register from './register.js';
import Login from './login.js';
import Profile from './src/components/Profile.js';
import File from './src/components/Files';
import NavBar from './src/components/NavBar';
import AwesomeAlert from 'react-native-awesome-alerts';

export default function App() {
  const [dark, setDark] = useState(getMode());
  const [open, setOpen] = useState(false);

  const [loaded] = useFonts({
    Arial: require('./assests/fonts/arial.ttf'),
    Calibri: require('./assests/fonts/CALIBRI.ttf'),
    Montserrat: require('./assests/fonts/Montserrat.ttf'),
    OpenSans: require('./assests/fonts/OpenSans.ttf'),
    TimesNewRoman: require('./assests/fonts/times.ttf'),
  });

  useEffect(() => {
    document.addEventListener('fullscreenchange', exitHandler);
  }, [])

  function exitHandler() {
    if (!document.fullscreenElement && !document.webkitIsFullScreen && !document.mozFullScreen && !document.msFullscreenElement) {
      alert("penguins");
    }
} 
  

  window.onunload = () => {
    //window.localStorage.clear()
    if (window.performance.getEntriesByType("navigation")[0].type != "reload"){
      null;
    } else {
      localStorage.setItem("loggedIn", false);
      localStorage.setItem("access_token", '');
      localStorage.setItem("refresh_token", '');
      localStorage.setItem("postID", '');
      localStorage.setItem("postTitle", '');
    }
  }

  return (
    <Router>
      <View style={[styles.container,{backgroundColor: dark ? "#A9A9A9" : '#F5F5F5'}]}>     
        <NavBar mode={dark} />
        {/* <AwesomeAlert
          show={true}
          showProgress={false}
          title="AwesomeAlert"
          message="I have a message for you!"
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showCancelButton={true}
          showConfirmButton={true}
          cancelText="No, cancel"
          confirmText="Yes, delete it"
          confirmButtonColor="#DD6B55"
          onCancelPressed={() => {
          }}
          onConfirmPressed={() => {
          }}
        /> */}
        <Pressable onPress={() => {localStorage.setItem("DarkMode", !dark)}}>
          {dark ? <Feather name="moon" size={24} color="darkblue" /> : <Feather name="sun" size={24} color="yellow" />}
        </Pressable>
        <Pressable onPress={() => setOpen(true)}><Text>ncijke</Text></Pressable>
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
