import React from 'react';
import axiosInstance from './axios';
import { StyleSheet, ImageBackground, View, TouchableOpacity, Text, Button} from 'react-native';

class CRUD extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            title: "ThirdPost",
            description: "Test edit",
            author: 3,
        }
        this.requestData = this.requestData.bind(this);
    }

    requestData() {
        console.log(axiosInstance.defaults);
        axiosInstance
            .post(`create/`, {
                title: this.state.title,
                description: this.state.description,
                author: this.state.author,
            })
            .then((res) => {
                console.log("eggs");
                console.log(res);
            });
    }

    editData() {
        axiosInstance
            .put(`edit/2/`, {
                title: this.state.title,
                description: this.state.description,
                author: this.state.author,
            })
            .then((res) => {
                console.log(res);
            });
    }

    deleteData() {
        console.log(axiosInstance.defaults);
        axiosInstance
            .delete(`delete/4`)
            .catch(function (error) {
                if (error.response) {
                    console.log(error.response)
                }
            });
    }

    render(){
        return (
        <View>
            <Text>Create</Text>
            <Button onPress={this.requestData}></Button>
            <Text>Delete</Text>
            <Button onPress={this.deleteData}></Button>
            <Text>Edit</Text>
            <Button onPress={() => this.editData()}></Button>
        </View>    
        );
    }
    
}
export default CRUD;