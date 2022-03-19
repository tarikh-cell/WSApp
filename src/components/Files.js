import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Route, BrowserRouter as Router, Routes, Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../../axios';
import { EvilIcons } from '@expo/vector-icons';

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
    const [hover, setHover] = useState( false );

    return(
      <View style={{flexDirection: 'row', width: '70%', justifyContent: 'space-between', borderBottomWidth: 0.1, borderColor: 'lightgrey', padding: '1em', backgroundColor: hover ? 'lightgrey' : '#fff'}}>
        <TouchableOpacity style={{width: '95%', flexDirection: 'row'}} onPress={(event) => {event.preventDefault(); go(id, title, text);}} onMouseEnter={() => {setHover(true)}} onMouseLeave={() => setHover(false)} >
          <Text style={[styles.text, {width: '20%'}]}>{title}</Text>
          <Text style={[styles.text, {width: '55%'}]}>{text}</Text>
          {getText(text)}
          <Text style={[styles.text, {width: '20%'}]}>{text.length}</Text>
        </TouchableOpacity>
        <Pressable style={{width: '10%'}} onPress={(event) => {event.preventDefault(); deleteData(id);}}><EvilIcons name="trash" size={24} color="blue" /></Pressable>
      </View>
    );
  }

  function getText(text){
    let txt = '';
    for (let i = 0; i < text.length; i++){
      if (text.charAt(i).match(/^[0-9a-z]+$/)){
        txt += text.charAt(i);
      }
    }
  }

  return (
      <View style={styles.container}>
        { data !== null ? 
          
          <>
            <Text style={{textAlign: 'left', width: '70%', fontWeight: '300', fontSize: '30px', marginBottom: '1em'}}>My Files</Text> 
            <View style={{flexDirection: 'row', width: '70%', justifyContent: 'space-between', padding: '1em', backgroundColor: '#fff', borderTopStartRadius: '5px'}}>
              <Text style={[styles.text, {width: '20%'}]}>Name</Text>
              <Text style={[styles.text, {width: '50%'}]}>Preview</Text>
              <Text style={[styles.text, {width: '20%'}]}>Size</Text>
              <Text style={{color: 'white', width: '10%'}}>Delete</Text>
            </View>
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
    height: '95%',
    marginTop: 15,
    alignItems: 'center',
    justifyContent: 'center',
    width: '95%',
  },
  text: {
    fontWeight: '400',
    fontSize: '16px',
  }
});