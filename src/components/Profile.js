import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View, TextInput } from 'react-native';
import { Dimensions } from 'react-native-web';
import {
  LineChart,

} from 'react-native-chart-kit';
import axiosInstance from '../../axios';
import { FontAwesome } from '@expo/vector-icons';

export default function Profile() {
  const [userId, setUserId] = useState("");
  const [text, onChangeText] = useState(getNote());
  const [dates, onChangeDates] = useState([]);
  const [times, onChangeTimes] = useState([]);

  const chartConfig = {
    backgroundGradientFrom: '#F5F5F5',
    backgroundGradientTo: '#F5F5F5',
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`
  }

  useEffect(() => {
    if (localStorage.getItem('loggedIn') === 'true'){
      axiosInstance.get('https://django-psql-persistent-workspace.apps.kube.eecs.qmul.ac.uk/api/user/use/').then((res) => setUserId(res.data.ID));
      axiosInstance.get('https://django-psql-persistent-workspace.apps.kube.eecs.qmul.ac.uk/api/productivity/get/').then((res) => {onChangeDates( dts => [...dts, res.data[0].date]); onChangeTimes( tms => [...tms, res.data[0].duration]);});
    }
  }, [])

  function setP() {
    axiosInstance.post(`productivity/new/`, {duration: 5, author: userId}).then((res) => console.log(res));
  }

  function saveNote(){
    localStorage.setItem("notes", text);
  }

  function getNote(){
    if (localStorage.getItem("notes")){
      return localStorage.getItem("notes");
    }
    return "";
  }

  return (
      <View style={styles.container}>
        <FontAwesome name="user" size={90} color="black" />
        <Text>User Profile:</Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '80%'}}>
          <LineChart
            data={{
              labels: dates,
              datasets: [{
                data: times
              }]
            }}
            width={400} // from react-native
            height={220}
            chartConfig={chartConfig}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16
            }}
          />
          <View style={styles.note}>
            <Text style={styles.title}>Notes:</Text>
            <TextInput style={styles.input} placeholder="Notes" placeholderTextColor="#9a73ef" autoCorrect={false} onChangeText={onChangeText} value={text} />
            <Pressable style={{alignSelf: 'center'}} onPress={ (event) => {event.preventDefault(); saveNote();}}><Text>Save</Text></Pressable>
          </View>
        </View>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    height: '95%',
    marginTop: 15,
    alignItems: 'center',
    justifyContent: 'center',
    padding: '5em',
    width: '90%'
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