import { StatusBar } from 'expo-status-bar';
import React from 'react';
import axiosInstance from './axios';
import { StyleSheet, Text, View, Button } from 'react-native';

class Register extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            email: 'taariq_best@live.com',
            username: 'tark',
            password: 'ppoland',
        }
    }

    handleClick() {
        console.log(this.state);
        axiosInstance
            .post(`user/register/`, {
                email: this.state.email,
                user_name: this.state.username,
                password: this.state.password,
            })
            .then((res) => {
                console.log(res);
            });
    }

    render () {
        return(
            <Button style={{width: 100}} onClick={this.handleClick}><Text>Click me</Text></Button>
        );
    }

}

export default Register;