import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import SingleDayWeatherInfo, { DailyWeatherInfo } from './SingleDayWeatherInfo';
import { ThemedText } from './ThemedText';
import DetermineTimingIcon from '@/app/utils/DetermineTimingIcon';
import { convertTimestamp } from '@/app/utils/convertTimeStamp';


export default function TimingWeather({sunset, sunrise, timezone}: {sunset: number, sunrise: number, timezone: number}) {




  
  return (
    <View style={styles.mainChart}>
      <View>
        <ThemedText style={{textAlign: 'center', fontWeight: 600, color: '#fff9'}}>Sunrise</ThemedText>
        <ThemedText style={{fontSize: 20, fontWeight: 'bold', lineHeight: 30}}>{convertTimestamp(sunrise, timezone)}</ThemedText>
      </View>
      <View >
        <DetermineTimingIcon sunrise={sunrise} sunset={sunset} timezone={timezone} />
      </View>
      <View>
        <ThemedText style={{textAlign: 'center', fontWeight: 600, color: '#fff9'}}>Sunset</ThemedText>
        <ThemedText style={{fontSize: 20, fontWeight: 'bold', lineHeight: 30}}>{convertTimestamp(sunset, timezone)}</ThemedText>
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
  