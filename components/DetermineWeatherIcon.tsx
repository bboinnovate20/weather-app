
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ThemedText } from './ThemedText';


import Rain from '@/assets/icons/rain.svg';
import Sun from '@/assets/icons/sun.svg';
import CloudRain from '@/assets/icons/cloudy-rain.svg';
import Cloud from '@/assets/icons/cloud.svg';
import { includesWord } from '@/app/utils/checkWord';

export interface WeatherIcon {
    weatherState: string,
    size?: {
        width: number,
        height: number
    }
}


const DetermineWeatherIcon = ({weatherState, size}: WeatherIcon) => {
        
    return (
            <View>   
                {includesWord(weatherState.toLowerCase(), 'sun') && <Sun width={size?.width ??150} height={size?.height ??150}/>  }
                {includesWord(weatherState.toLowerCase(), 'rain') && includesWord(weatherState.toLowerCase(), 'cloud')  && <CloudRain width={size?.width ?? 150} height={size?.height ??150}/>  } 
                {includesWord(weatherState.toLowerCase(), 'rain') && <Rain width={size?.width ?? 150} height={size?.height ?? 150}/> }
                {includesWord(weatherState.toLowerCase(), 'cloud') && <Cloud width={size?.width ??150} height={size?.height ??150}/>  } 
            </View>
    );
}

const styles = StyleSheet.create({})

export default DetermineWeatherIcon;

