import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function Profile() {
  return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <Text>Open</Text>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'row',
  }
});
