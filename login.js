import { StatusBar } from 'expo-status-bar';
import React from 'react';
import axiosInstance from './axios';
import { StyleSheet, Text, View, Button } from 'react-native';

class Login extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            username: 'tark',
            password: 'ppoland',
        }
    }

    handleClick() {
        console.log(this.state);
        axiosInstance
            .post(`user/login/`, {
                user_name: this.state.username,
                password: this.state.password,
            })
            .then((res) => {
                console.log(res);
            });
    }

    requestData() {
        const apiUrl = 'http://127.0.0.1:8000/api/';
        fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => console.log(data));
    }

    render () {
        return(
            <View>
            <Button style={{width: 100}} onClick={this.handleClick()}><Text>Click me</Text></Button>
            <Button style={{width: 100}} onPress={this.requestData}><Text>Click me</Text></Button>
            </View>
        );
    }

}

export default Login;