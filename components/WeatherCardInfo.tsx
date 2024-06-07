import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { ThemedText } from './ThemedText';


interface CardInfo {
    icon: any;
    name: string;
    status: string;
    circle?: boolean;
}


export default function WeatherCardInfo(props: CardInfo) {
  return (
    <View style={[styles.mainChart, props.circle == true  && {
        borderRadius: 100
    }]}>
        <View style={{display: 'flex', flexDirection: 'row'}}>
            <View style={{marginRight: 5}}>{props.icon}</View>
            <ThemedText style={{fontWeight: 'bold'}}>{props.name}</ThemedText>
        </View>
        <ThemedText type='defaultSemiBold' style={{fontSize: 30, lineHeight: 50}}>{props.status}</ThemedText>
    </View>
  )
}


const styles = StyleSheet.create({
    mainChart: {
      backgroundColor: '#5994D0',
      padding: 20,
      
      borderRadius: 15,
      width: '48%'
      
  }
      
    });

    