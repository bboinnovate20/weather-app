import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import SingleDayWeatherInfo, { DailyWeatherInfo } from './SingleDayWeatherInfo';
import { ThemedText } from './ThemedText';
import DetermineTimingIcon from '@/app/utils/determineTimingIcon';
import { convertTimestamp } from '@/app/utils/convertTimeStamp';


export default function DailyWeather({sunset, sunrise}: {sunset: number, sunrise: number}) {



  const DailyWeather: DailyWeatherInfo[] = [
    {
      day: 'Sunset',
      degree: '13°',
      degreeIconStatus: 'rain'
    },

    {
      day: 'Sunrise',
      degree: '25°',
      degreeIconStatus: 'rain'
    },
  ];



  
  return (
    <View style={styles.mainChart}>
      <View>
        <ThemedText style={{textAlign: 'center', fontWeight: 600, color: '#fff9'}}>Sunrise</ThemedText>
        <ThemedText style={{fontSize: 20, fontWeight: 'bold', lineHeight: 30}}>{convertTimestamp(sunrise)}</ThemedText>
      </View>
      <View >
        <DetermineTimingIcon sunrise={sunrise} sunset={sunset} />
      </View>
      <View>
        <ThemedText style={{textAlign: 'center', fontWeight: 600, color: '#fff9'}}>Sunset</ThemedText>
        <ThemedText style={{fontSize: 20, fontWeight: 'bold', lineHeight: 30}}>{convertTimestamp(sunset)}</ThemedText>
      </View>    
    </View>
  )
}

const styles = StyleSheet.create({
  mainChart: {
    backgroundColor: '#5994D0',
    padding: 30,
    borderRadius: 15,
    marginTop: 30,
    paddingHorizontal: 15,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center'
}
    
  });
  