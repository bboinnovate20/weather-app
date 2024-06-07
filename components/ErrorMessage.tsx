import { View, StyleSheet } from 'react-native'
import React from 'react'
import { ThemedText } from './ThemedText';
import Location from '@/assets/icons/noweather.svg'

export default function ErrorMessage({message}: {message: string}) {
  return (
    <View style={styles.centeredMessage}>
    <Location width={200} height={200}/>
    <ThemedText style={styles.errorText}>{message.toUpperCase()}</ThemedText>
  </View>
  )
}



const styles = StyleSheet.create({

    centeredMessage: {
      
        display: 'flex',
        height: '80%',
        justifyContent: 'center',
        alignItems: 'center'
      
    },
  
    errorText: {
      fontSize: 35,
      fontWeight: 'bold'
    }
  });