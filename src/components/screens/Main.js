import React from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';

const Main = () =>
{
    return (
        <>
            <View style={styles.container}>
                <Text>Open up App.js to start working on your app!</Text>
                <Text>{process.env.EXPO_PUBLIC_API_ADDRESS}</Text>
                <StatusBar style="auto" />
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

export default Main; 