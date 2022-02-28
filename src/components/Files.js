import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View, TextInput } from 'react-native';

import { Route, BrowserRouter as Router, Routes, Link } from 'react-router-dom';
import axiosInstance from '../../axios';

export default function File(props) {
  const [data, setData] = useState( null );
  const [int, setInt] = useState(0);

  useEffect (() => {
    const loadUserList = async () => {
      if (localStorage.getItem('loggedIn') === 'true'){
        const apiUrl = 'http://127.0.0.1:8000/api/';
        axiosInstance.get(apiUrl).then( (res) => setData(res.data)) }
      }
      loadUserList();
  }, [])

  

  return (
      <View style={styles.container}>
        {console.log(data)}
        { data !== null ? 
          
          <>
            <Text>Files</Text> 
            {data.map((values, index) => (
              <ListItem key={index} title={values['title']} />
            ))}
          </>

        :  <Text style={{textAlign: 'center'}}>Nothing here at the moment... {"\n"}<Link to="/LogIn">LogIn</Link> to view your files.</Text>
        }
      </View>
  );
}

function ListItem(props){
  const { title } = props;
  return(
    <Text>{title}</Text>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    height: '95%',
    marginTop: 15,
  }
});