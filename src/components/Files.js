import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Pressable, StyleSheet, Text, View, TextInput } from 'react-native';

export default function File() {

  return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <Text style={{textAlign: 'center'}}>Do stuff</Text>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    height: '95%',
    marginTop: 15,
    justifyContent: 'center',
  }
});