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

export default function App() {
  const [dark, setDark] = useState(getMode());
  const [open, setOpen] = useState(false);
  const [nav, setNav] = useState(true);

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
      setOpen(!open);
    }
  }
  
  function Mode() {
    return(
      <Pressable onPress={() => {localStorage.setItem("DarkMode", !dark); setDark(!dark);}}>
          {dark ? <Feather name="moon" size={24} color="darkblue" /> : <Feather name="sun" size={24} color="yellow" />}
      </Pressable>
    );
  }

  function Close() {
    return(
      <Pressable style={{alignContent: 'flex-end', position: 'absolute', bottom: 40, left: 10, zIndex: 3}} onPress={() => setNav(!nav)}>
        { nav ? <Feather name="x" size={24} color="darkblue" /> : <Feather name="menu" size={24} color="darkblue" /> }
      </Pressable>
    );
  }
  

  window.onunload = () => {
    //window.localStorage.clear()
    if (window.performance.getEntriesByType("navigation")[0].type != "reload" || window.performance.getEntriesByType("navigation")[0].type != "navigate" || window.performance.getEntriesByType("navigation")[0].type != "back_forward"){
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
      {open ? <View style={{zIndex: 2, height: '100%',width:'100%', position: 'absolute', justifyContent: 'center', alignContent: 'center', backgroundColor: 'rgba(236, 236, 236, 0.5)'}}>
        <View style={{backgroundColor: dark ? "#A9A9A9" : '#FFF', width: '15em', height: '10em', alignSelf:'center', justifyContent: 'space-around', borderRadius: '8px'}}>
          <Text style={{fontSize: 20, alignSelf: 'center'}}>Alert!</Text><Text style={{alignSelf: 'center'}}>Exited Concentrated Mode</Text>
          <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
          <Button onPress={() => {document.documentElement.requestFullscreen();setOpen(!open);}} title="Re-Enter" />
          <Button onPress={() => setOpen(!open)} title="Cancel" />
          </View>
          </View>
      </View>:null}
      <View style={[styles.container,{backgroundColor: dark ? "#A9A9A9" : '#F5F5F5'}]}>     
        { nav ? <NavBar mode={dark} modeButton={<Mode />} /> : null}
        <Close />
        <View style={[styles.container,{backgroundColor: dark ? "#A9A9A9" : '#F5F5F5', justifyContent: 'center'}]}>  
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="Profile" element={<Profile mode={dark} />} />
          <Route path="LogIn" element={<Login mode={dark} />} />
          <Route path="Files" element={<File mode={dark} />} />
          <Route path="Register" element={<Register mode={dark} />} />
        </Routes>     
        </View>
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
