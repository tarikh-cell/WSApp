import React, { useState } from 'react';
import axiosInstance from './axios';
import { StyleSheet, View, Text, TextInput, Button } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { createEditor } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';
import Editor from './src/components/Editor';
import BaseDocument from './src/utils/BaseDocument';

function Main (){

    const [document, updateDocument] = useState(BaseDocument);

    {/*requestData() {
        const apiUrl = 'http://127.0.0.1:8000/api/';
        fetch(apiUrl, {
            headers: new Headers({
                'Authorization': localStorage.getItem('access_token')
                ? 'JWT ' + localStorage.getItem('access_token')
                : null,
                'Content-Type': 'application/json',
            }),
        })
            .then((data) => data.json())
            .then((data) => {console.log(data)})
    }*/}

    return (
        <Editor document={document} onChange={updateDocument} />   
    );
    
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: '50%',
      height: '70%',
      marginLeft: 65,
      marginTop: 15,
      backgroundColor: '#fff',
    },
});

export default Main;