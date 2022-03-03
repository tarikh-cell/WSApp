import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View, TextInput } from 'react-native';
import axiosInstance from '../../axios';

export default function Profile() {
  const [userId, setUserId] = useState("");
  const [text, onChangeText] = React.useState("");

  useEffect(() => {
    if (localStorage.getItem('loggedIn') === 'true'){
      axiosInstance.get('http://127.0.0.1:8000/api/user/use/').then((res) => setUserId(res.data.ID));
    }
  }, [])

  function getP() {
    axiosInstance.get('http://127.0.0.1:8000/api/productivity/get/').then((res) => console.log(res));
  }

  function setP() {
    axiosInstance.post(`productivity/new/`, {duration: 5, author: userId}).then((res) => console.log(res));
  }

  function saveNote(){
    console.log("Better");
  }

  return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <Text>Open</Text>
        <TextInput style={styles.input} placeholder="Notes" placeholderTextColor="#9a73ef" autoCorrect={false} onChangeText={onChangeText} value={text} />
        <Pressable onPress={ (event) => {event.preventDefault(); saveNote();}}><Text>Save</Text></Pressable>
        <Pressable onPress={ (event) => {event.preventDefault(); getP();}}><Text>4v4crnlk</Text></Pressable>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    height: '95%',
    marginTop: 15,
    justifyContent: 'center',
  }
});