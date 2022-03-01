import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View, TextInput } from 'react-native';

import { Route, BrowserRouter as Router, Routes, Link } from 'react-router-dom';
import axiosInstance from '../../axios';

export default function File(props) {
  const [data, setData] = useState( null );

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
              <ListItem key={index} id={values['id']} title={values['title']} text={values['description']} />
            ))}
          </>

        :  <Text style={{textAlign: 'center'}}>Nothing here at the moment... {"\n"}<Link to="/LogIn">LogIn</Link> to view your files.</Text>
        }
      </View>
  );
}

function deleteData(post) {
    axiosInstance
        .delete(`delete/` + post)
        .catch(function (error) {
            if (error.response) {
                console.log(error.response)
            }
    });
  }

function ListItem(props){
  const { id, title, text } = props;
  return(
    <View>
      <Text>{title}</Text>
      <Text>e{text}</Text>
      <Pressable onPress={(event) => {event.preventDefault(); deleteData(id);}}><Text>Delete</Text></Pressable>
      <Pressable onPress={(event) => {event.preventDefault(); }}><Link to="/"><Text>GOOO</Text></Link></Pressable>
    </View>
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