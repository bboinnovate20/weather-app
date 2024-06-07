import { View, Text, StyleSheet, FlatList } from 'react-native'
import React from 'react'
import { ThemedText } from '@/components/ThemedText';
import MainWeatherChart, { WeatherInfo } from './MainWeatherChart';

export default function WeatherChart() {



    const weatherOvertime: WeatherInfo[] = [
        {
            time: '2pm',
            status: 'sun'
        },
        {
            time: '4pm',
            status: 'rain'
        },
        {
            time: '6pm',
            status: 'rain-cloudy'
        },
        {
            time: '7pm',
            status: 'rain'
        },
        {
            time: '8pm',
            status: 'sun'
        },
        {
            time: '9pm',
            status: 'sun'
        },
        {
            time: '10pm',
            status: 'sun'
        },
        {
            time: '11pm',
            status: 'sun'
        }
        
    ]



    return (
        <View style={styles.mainChart}>

            <View
                style={{
                    borderBottomColor: '#c2d0ed',
                    borderBottomWidth: 2, 
                    marginBottom: 10
                    }}
                    >
                <ThemedText
                    style={{
                        // color: '#000',
                        fontWeight: '600',
                        fontSize: 18,
                        paddingBottom: 15,
                    
                    }} >
                    Weather Overtime
                </ThemedText>
            </View>
            <View>

            </View>
            <FlatList
                horizontal={true}
                data={weatherOvertime}
                renderItem={({item}) => <MainWeatherChart time={item.time} status={item.status}/>}
                keyExtractor={item => item.time}
            />
                
        </View>
    );
}


const styles = StyleSheet.create({
    mainChart: {
        backgroundColor: '#5994D0',
        padding: 30,
        borderRadius: 15,
        marginTop: 30,
        paddingHorizontal: 15
        
    }
});