import { View, Text, StyleSheet, ScrollView} from 'react-native'
import React from 'react'
import { ThemedText } from './ThemedText'
import DetermineWeatherIcon from './DetermineWeatherIcon';
import Location from '@/assets/icons/location.svg'

interface WeatherInfo {
    currentWeather: string,
    degreeCelcius: number,
    city: string
}

export default function WeatherDegree({currentWeather, degreeCelcius, city} : WeatherInfo) {
  return (
    
      <View style={styles.headerWeatherContainer}>
        <View>
          <View 
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center'
            }}
            >
             <ThemedText type='defaultSemiBold' style={styles.textHeader}>{city}</ThemedText>
             <Location width={20} height={20} />
          </View>
          <View style={styles.weatherDegree}>
            <View>
                <ThemedText
                    // type='defaultSemiBold'
                    style={{
                    fontSize: 70,
                    fontWeight: 600,
                    }}>{Math.round(degreeCelcius)}</ThemedText>
                <ThemedText type='defaultSemiBold' style={{fontSize: 20, textAlign: 'left'}}>{currentWeather}</ThemedText>
            </View>
              <ThemedText  style={{fontSize: 50, fontWeight: 'bold'}}>o</ThemedText>
          </View>
          
        </View>
        <DetermineWeatherIcon weatherState={currentWeather} />     

      </View>
    
    )
}

const styles = StyleSheet.create({
    weatherDegree: {
      // backgroundColor: "#041187",
      // flex:1,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'flex-start'
    },

    textHeader: {
      fontSize: 30,
      lineHeight: 70,
      paddingRight: 5,
      color: "#fff"
      
    },
    headerWeatherContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      // height: '100%'
    }
});
  