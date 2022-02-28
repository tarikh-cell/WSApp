import React, { useState } from 'react';
import axiosInstance from './axios';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { createEditor } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';
import Editor from './src/components/Editor';
import BaseDocument from './src/utils/BaseDocument';

function Main (props){
    const [document, updateDocument] = useState(BaseDocument);

    return (
        <>
            <Editor document={document} onChange={updateDocument} />   
        </>
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