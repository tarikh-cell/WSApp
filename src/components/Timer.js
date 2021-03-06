import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import axiosInstance from '../../axios';

export default function Timer() {
    const [hour, setHour] = useState("");
    const [minute, setMinute] = useState("");
    const [secs, setSecs] = useState(60);
    const [targetTime, setTargetTime] = useState("");
    const [start, setStart] = useState(false);
    const [userId, setUserId] = useState("");

    useEffect( () => {
        if (localStorage.getItem('loggedIn') === 'true' && userId === ""){
            axiosInstance.get('https://django-psql-persistent-workspace.apps.kube.eecs.qmul.ac.uk/api/user/use/').then((res) => setUserId(res.data.ID));
        }
        let intervalID = setInterval(
            () => tick(),
            1000
          );
        return () => clearInterval(intervalID);
    }, []);

    function tick() {
        setSecs(getSecs());
        if (secs <= 0){
            setMinute(minute - 1);
        }
    }

    function getSecs() {
        let s = 60 - (new Date().getSeconds());
        let t = '';
        if (s < 10){
          t = t + ':0' + s.toLocaleString();
        } else {
          t = t + ':' + s.toLocaleString();
        }
  
        return(
          t
      );
    }

    function getTime(){
        let hours = new Date().getHours();
        let minutes = new Date().getMinutes()
        let newHour = hours + parseInt(hour);
        let newMinute;
        if (minutes + parseInt(minute) > 60){
            newHour += 1;
            newMinute = (minutes + parseInt(minute)) - 60;
        } else {
            newMinute = minutes + parseInt(minute);
        }
        setTargetTime("" + newHour + "" + newMinute);
        setStart(true);
    }

    function checkTimeLeft(){
        let hours = new Date().getHours();
        let minutes = new Date().getMinutes();

        let hrs = targetTime.substring(0,2);
        let mins = targetTime.substring(2,4);

        let hrsLeft = (hrs-hours).toLocaleString()
        let minsLeft = (mins-minutes).toLocaleString()
        
        if (minutes > mins){
            minsLeft = (60-minutes+parseInt(mins)).toLocaleString()
        } 
        if (minutes > mins){
            hrsLeft = parseInt(hrsLeft) - 1;
        }
        if (hrsLeft < 10 && hrsLeft > 0){
            hrsLeft = '0' + hrsLeft
        }
        if (minsLeft < 10){
            minsLeft = '0' + minsLeft
        }
        if (hrsLeft < 0){
            hrsLeft = 0;
        }

        if (start) {if(minsLeft <= 0 && hrsLeft <= 0){
            setStart(false);
            setP();
        }}
        
        let timeLeft = hrsLeft + ':' + minsLeft
        return timeLeft
    }

    function setP() {
        if (localStorage.getItem('loggedIn') === 'true') {
            axiosInstance.post(`productivity/new/`, {duration: (hour*60)+minute, author: userId}).then((res) => console.log(res));
        }
    }

    return(
        <View style={[styles.container, {margin: start ? '2em' : '5em'}]}>
            
            { start ? <Text style={[styles.input, {fontSize: '50px', opacity: 0.1}]}>{checkTimeLeft()}{secs}</Text> : 
            <>
                <Text>Timer:</Text>
                <View style={{flexDirection: 'row'}}>
                    <TextInput style={styles.input} placeholder="Hours" placeholderTextColor="#9a73ef" onChangeText={setHour} value={hour} />
                    <TextInput style={styles.input} placeholder="Mins" placeholderTextColor="#9a73ef" onChangeText={setMinute} value={minute} />
                </View>
                <Pressable style={{alignSelf: 'center'}} onMouseDown={() => getTime()}><AntDesign name="caretright" size={24} color="black" /></Pressable>
                </>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        // borderRadius: '8px',
        // borderWidth: '1px',
        // borderColor: 'lightgrey',
        height: '20%',
        marginTop: '5%',
        // margin: '5em',
    },
    input: {
        width: '5em',
        height: '3em',
        padding: '5px',
        marginVertical: '1em',
      },
});