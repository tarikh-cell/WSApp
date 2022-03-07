import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View, TextInput } from 'react-native';

import { Route, BrowserRouter as Router, Routes, Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../../axios';

export default function File(props) {
  const [data, setData] = useState( null );
  let navigate = useNavigate();

  useEffect (() => {
    const loadUserList = async () => {
      if (localStorage.getItem('loggedIn') === 'true'){
        const apiUrl = 'https://django-psql-persistent-workspace.apps.kube.eecs.qmul.ac.uk/api/';
        axiosInstance.get(apiUrl).then( (res) => setData(res.data)) }
      }
      loadUserList();
  }, [])

  function go(id, title, text) {
    localStorage.setItem("postID", id);
    localStorage.setItem("postTitle", title);
    navigate("/", {state : text});
  }

  function ListItem(props){
    const { id, title, text } = props;
    return(
      <View style={{flexDirection: 'row', width: '70%'}}>
        <Text>{title}</Text>
        <Text>{text}</Text>
        <Pressable onPress={(event) => {event.preventDefault(); deleteData(id);}}><Text>Delete</Text></Pressable>
        <Pressable onPress={(event) => {event.preventDefault(); go(id, title, text);}}><Text>GOOO</Text></Pressable>
      </View>
    );
  }

  return (
      <View style={styles.container}>
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



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    height: '95%',
    marginTop: 15,
  }
});