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

    logout() {
        const response = axiosInstance.post('user/logout/blacklist/', {
			refresh_token: localStorage.getItem('refresh_token'),
		});
		localStorage.removeItem('access_token');
		localStorage.removeItem('refresh_token');
		axiosInstance.defaults.headers['Authorization'] = null;
        console.log(response);
    }

    handleClick() {
        axiosInstance
            .post(`token/`, {
                user_name: this.state.username,
                password: this.state.password,
            })
            .then((res) => {
                localStorage.setItem('access_token', res.data.access);
                localStorage.setItem('refresh_token', res.data.refresh);
                axiosInstance.defaults.headers['Authorization'] =
                    'JWT ' + localStorage.getItem('access_token', res.data.access);
                console.log(res);
            });
    }

    render () {
        return(
            <View>
            <Button style={{width: 100}} onClick={this.handleClick()}><Text>Click me</Text></Button>
            <Button style={{width: 100}} onPress={this.logout}><Text>Click me</Text></Button>
            </View>
        );
    }

}

export default Login;