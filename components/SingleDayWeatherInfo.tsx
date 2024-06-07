import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import DetermineWeatherIcon, { WeatherIcon } from './DetermineWeatherIcon'
import { ThemedText } from './ThemedText'



export interface DailyWeatherInfo {
    day: string,
    degree: string,
    degreeIconStatus: WeatherIcon['weatherState'],
    isFirst?: boolean
}

export default function SingleDayWeatherInfo(props: DailyWeatherInfo) {
  return (
    <View style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    }}>
      <ThemedText type={props.isFirst ? 'defaultSemiBold': 'default'} style={[styles.text, props.isFirst && {fontSize: 23, color: '#fff9'}]}>{props.day}</ThemedText>
        <View style={{
            display: 'flex',
            flexDirection: 'row'
        }}>
        <View style={{marginHorizontal: 10}}>
            <DetermineWeatherIcon weatherState={props.degreeIconStatus} size={{width: 25, height: 25}}/>

        </View>
        <ThemedText style={styles.text}>{props.degree}</ThemedText>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    text: {
        
        fontSize: 20
    }
})