import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';

export default function Timer() {
    const [hour, setHour] = useState("");
    const [minute, setMinute] = useState("");
    const [secs, setSecs] = useState(60);
    const [targetTime, setTargetTime] = useState("");
    const [start, setStart] = useState(false);

    useEffect( () => {
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
        }}
        
        let timeLeft = hrsLeft + ':' + minsLeft
        return timeLeft
    }

    return(
        <View style={styles.container}>
            <Pressable onMouseDown={() => getTime()}><Text>start</Text></Pressable>
            <TextInput style={styles.input} placeholder="Hours" placeholderTextColor="#9a73ef" onChangeText={setHour} value={hour} />
            <TextInput style={styles.input} placeholder="Mins" placeholderTextColor="#9a73ef" onChangeText={setMinute} value={minute} />
            { start ? <Text>Timer: {checkTimeLeft()}{secs}</Text> : null}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        borderRadius: '8px',
        borderWidth: '1px',
        borderColor: 'lightgrey',
        height: '30%',
        marginTop: '5%',
    },
    input: {
        borderWidth: '1.5px',
        borderColor: '#8B008B',
        width: '5em',
        height: '3em',
        padding: '5px',
        marginVertical: '1em',
      },
});