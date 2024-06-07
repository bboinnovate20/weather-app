import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { ThemedText } from './ThemedText'
import DetermineWeatherIcon, { WeatherIcon } from './DetermineWeatherIcon'




export interface WeatherInfo {
    time: string,
    status: WeatherIcon['weatherState']
}

export default function MainWeatherChart(props: WeatherInfo) {
  return (
    <View style={styles.eachPastTime}>
      <ThemedText style={{ marginBottom: 20, fontWeight: '500'}}>2pm</ThemedText>
      <DetermineWeatherIcon weatherState={props.status} size={{width: 25, height: 25}}/>
    </View>
  )
}
const styles = StyleSheet.create({
    eachPastTime: {
        display: 'flex',
        justifyContent: 'center',
        alignItems:'center',
        width: 55,
        flexDirection: 'column'
        
    }
})