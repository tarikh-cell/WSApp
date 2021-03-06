import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Dimensions } from 'react-native-web';
import {
  LineChart,
  BarChart,
  ProgressChart,

} from 'react-native-chart-kit';
import axiosInstance from '../../axios';
import { FontAwesome, AntDesign } from '@expo/vector-icons';

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
      axiosInstance.get('https://django-psql-persistent-workspace.apps.kube.eecs.qmul.ac.uk/api/productivity/get/').then((res) => {onChangeDates(refactor(res.data)); onChangeTimes(refactor2(res.data));});
    }
  }, [])

  function refactor(dates){
      let d = [];
      for(let i = 0; i < dates.length; i++){
        d.push(dates[i].date);
      }
      return d;
    }

    function refactor2(dates){
      let d = [];
      for(let i = 0; i < dates.length; i++){
        d.push(dates[i].duration);
      }
      return d;
    }

  // function refactor(){
  //   let d = [];
  //   for(let i = 0; i < dates[0].length; i++){
  //     d.push(dates[0][i].date);
  //   }
  //   onChangeDates(d);
  //   let x = [];
  //   for(let i = 0; i < times[0].length; i++){
  //     x.push(times[0][i].duration);
  //   }
  //   onChangeTimes(x);
  // }

  function getNote(){
    if (localStorage.getItem("notes")){
      return localStorage.getItem("notes");
    }
    return "";
  }

  function ListItem(props){
    const { id, date, time } = props;
    const [hover, setHover] = useState( false );
    return(
      <View style={{flexDirection: 'row', width: '70%', justifyContent: 'space-between', borderBottomWidth: 0.1, borderColor: 'lightgrey', padding: '1em', backgroundColor: hover ? '#D8BFD8' : '#fff'}}>
        <TouchableOpacity style={{width: '95%', flexDirection: 'row'}} onPress={(event) => {event.preventDefault(); }} onMouseEnter={() => {setHover(true)}} onMouseLeave={() => setHover(false)} >
          <Text style={[styles.text, {width: '20%'}]}>{id}</Text>
          <Text style={[styles.text, {width: '55%'}]}>{date}</Text>
          <Text style={[styles.text, {width: '20%'}]}>{time}</Text>
        </TouchableOpacity>
        <Pressable style={{width: '10%'}} onPress={(event) => {event.preventDefault();}}></Pressable>
      </View>
    );
  }

  return (
      <View style={styles.container}>
        
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={{fontSize: '30px', margin: '1%'}}>Account Overview</Text>  
          <Text style={{textAlign: 'right', margin: '1%'}}>{new Date().toDateString()}</Text>
        </View>
        <Toolbar />
        {/* <View style={styles.note}>
          <Text style={styles.title}>Notes:</Text>
          <TextInput style={styles.input} placeholder="Notes" placeholderTextColor="#9a73ef" autoCorrect={false} onChangeText={onChangeText} value={text} />
          
        </View>   */}
        <Text>Your application usage history.</Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
        
          <LineChart
            data={{labels: dates, datasets: [{ data: times }] }}
            width={400} // from react-native
            height={220}
            chartConfig={chartConfig}
            bezier
            style={{ marginVertical: 8, borderRadius: 16 }}
          />
          <BarChart
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
        </View>
        <View style={{alignItems: 'center'}}>
        <View style={{flexDirection: 'row', width: '70%', justifyContent: 'space-between', padding: '1em', backgroundColor: '#fff', borderTopStartRadius: '5px'}}>
              <Text style={[styles.text, {width: '20%'}]}>Id</Text>
              <Text style={[styles.text, {width: '50%'}]}>Date</Text>
              <Text style={[styles.text, {width: '20%'}]}>Time</Text>
              <Text style={{color: 'white', width: '10%'}}></Text>
            </View>
        {dates.map((values, index) => (
              <ListItem key={index} id={index} date={dates[index]} time={times[index]} />
            ))}
            </View>
      </View>
  );
}

function Toolbar() {
  return(
    <View style={styles.toolbar}>
      <View style={{backgroundColor: 'lightgrey', width: '8%', borderRadius: '8px', padding: '1%', flexDirection: 'row', alignItems: 'center', margin: '5px', justifyContent: 'space-between'}}>
        <Text>Hi, {localStorage.getItem('user')}</Text>
        <AntDesign name="user" size={24} color="black" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    width: '100%',
    height: '100%',
    padding: '1em',
  },
  profile: {
    borderRightWidth: '1px',
    borderColor: 'purple'
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
  },
  toolbar: {
    // borderBottomWidth: '1px',
    borderColor: '#D8BFD8',
    flexDirection: 'row',
    // justifyContent: 'flex-end',
    height: '8%'
  },
});