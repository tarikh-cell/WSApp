import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View, TextInput } from 'react-native';

export default function SideBar() {
    return(
        <View style={styles.container}>
            <Notes />
        </View>
    );
}

function Notes() {
    const [text, onChangeText] = useState(getNote());
    
    function saveNote(){
        localStorage.setItem("notes", text);
    }

    function getNote(){
        if (localStorage.getItem("notes")){
        return localStorage.getItem("notes");
        }
        return "";
    }

    return(
        <View style={styles.note}>
            <Text style={styles.title}>Notes:</Text>
            <TextInput style={styles.input} placeholder="Notes" placeholderTextColor="#9a73ef" autoCorrect={false} onChangeText={onChangeText} value={text} />
            <Pressable style={{alignSelf: 'center'}} onPress={ (event) => {event.preventDefault(); saveNote();}}><Text>Save</Text></Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '12em',
        backgroundColor: '#fff',
        padding: '0.5%',
    },
    note: {
      height: '10em',
      borderColor: 'lightgrey',
      borderWidth: '0.1px',
      borderRadius: '8px'
    },
    title: {
        borderBottomWidth: '0.1px',
        borderBottomColor: 'grey',
        padding: '1px',
    }
  });