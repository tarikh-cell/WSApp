import React from 'react';
import { StyleSheet, ImageBackground, View, TouchableOpacity, Text, ActivityIndicator} from 'react-native';

class Main extends React.Component{

    componentDidMount() {
        const apiUrl = 'http://127.0.0.1:8000/api/';
        fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => console.log(data));
        }

    render(){
        return (
        <View>
            <Text>f4</Text>
        </View>    
        );
    }
    
}
export default Main;