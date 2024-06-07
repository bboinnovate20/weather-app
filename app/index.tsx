import { Image, StyleSheet, Platform, View, Text, ActivityIndicator } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { SafeAreaView } from 'react-native-safe-area-context';
import WeatherDegree from '@/components/WeatherDegree';
import { LinearGradient } from 'expo-linear-gradient';
import DetermineWeatherIcon from '@/components/DetermineWeatherIcon';
import WeatherChart from '@/components/WeatherChart';
import YesterdayWeather from '@/components/DailyWeather';
import DailyWeather from '@/components/DailyWeather';
import CustomSearchBar from '@/components/CustomSearchBar';
import { useEffect, useState } from 'react';
import { UserLocation, WeatherInformation, WeatherLocation } from './utils/location';
import WeatherCardInfo from '@/components/WeatherCardInfo';

import Humidity from '@/assets/icons/humidity.svg';
import Wind from '@/assets/icons/wind.svg';
import Pressure from '@/assets/icons/wind.svg';
import Visibility from '@/assets/icons/eye.svg';
import { WeatherInfo } from '@/components/MainWeatherChart';

interface GeoLocation {
  longitude: number,
  latitude: number,
}

export default function HomeScreen() {

  const [loadingWeather, setLoadingWeather ] = useState<boolean>(false);
  const [isPermissionAllowed, setIsPermissionAllowed] = useState<boolean>(true);
  const [location, setLocation] = useState<GeoLocation>({longitude: 0, latitude:0})
  const [weatherInfo, setWeatherInfo] = useState<WeatherInformation>();
  const [error, setError] = useState('');

async function getLocation(city?: string) {
  setLoadingWeather(true);

  const locationInstance = new UserLocation();
  const initiated = await initiatePermission(locationInstance);

  if(initiated) {
    console.log('initiated!');
    const getLocation = await locationInstance.getCurrentLocation();

    if(getLocation[0]) {
      const location: GeoLocation = getLocation[1] as GeoLocation;
      let locationInstance;

      if(city) {
         locationInstance = await getByCity(city);
      }
      else {
          locationInstance = await getWeatherLocation(location.longitude, location.latitude);
      }
      const instance: WeatherInformation = new WeatherInformation(locationInstance);
      
      console.log('The weather info', instance);
      if(instance.status == 200) {
        setWeatherInfo(instance);
      } 
      else {
        setError(instance.message)
      }
        
     }
      else {
            console.log('none')
      }
  }

  setLoadingWeather(false);


}


async function getWeatherLocation(longitude:number, latitude:number) {
  const weatherAPIInstance = new WeatherLocation(longitude, latitude);
  const response = await weatherAPIInstance.getCurrentLocation();
  return response;
}

async function getByCity(city: string) {
  const weatherAPIInstance = new WeatherLocation(0, 0);
  const response = await weatherAPIInstance.getByCity(city);
  return response;
}


async function initiatePermission(locationInstance: UserLocation) {
  
  const getCurrentLocation = await locationInstance.getCurrentLocation();

  if(!getCurrentLocation[0]) {
    setIsPermissionAllowed(false);
    return false;
  }
  else {
    setIsPermissionAllowed(true);
    return true;
  }
  
  
}

async function searchForCity(city: string) {

}


useEffect(() => {
  getLocation();
}, [])


return (
  <>
      <LinearGradient 
        colors={[ '#5A99E0','#5B9ADF','#7DB2D4']}
          style={styles.container}>
        <SafeAreaView style={styles.safeArea}>
              <CustomSearchBar
                onSearch={(value) => getLocation(value)}
                />
                {
                  !loadingWeather ? 
                    isPermissionAllowed ? 
                      error.length > 2 ? 
                      <View style={styles.centeredMessage}>
                      <ThemedText>{error}</ThemedText>
                    </View> :
                    <View>
                      <WeatherDegree city={weatherInfo?.cityName ?? ''} degreeCelcius={Number(weatherInfo?.temperature ?? 0)} currentWeather={weatherInfo?.weatherStatus ?? weatherInfo?.description ?? ''}/>

                      <View style={styles.otherInfoContainer}>
                          <WeatherCardInfo
                            name='Humidity'
                            icon={<Humidity/>}
                            status={`${weatherInfo?.humidity ?? ''}%`}
                            />
                            <WeatherCardInfo
                            name='Wind'
                            icon={<Wind/>}
                            status={`${weatherInfo?.wind ?? ''} km/h`}
                            />
                            <WeatherCardInfo
                            name='Pressure'
                            icon={<Pressure/>}
                            status={`${weatherInfo?.pressure ?? ''} mb`}
                            />
                            <WeatherCardInfo
                            name='Visibility'
                            icon={<Visibility/>}
                            status={`${weatherInfo?.visibility ?? ''} km`}
                            />
                          
                      </View>
                      {/* <WeatherChart/> */}
                      <DailyWeather sunrise={weatherInfo?.sunrise ?? 20} sunset={weatherInfo?.sunset ?? 0}/>
                    </View> : 
                    <View style={styles.centeredMessage}>
                      <ThemedText>Permission is not Granted please grant Permission</ThemedText>
                    </View>
                    
                    
                    : 
                    <View style={styles.centeredMessage}>
                      <ActivityIndicator size='large' color="#fff" />
                    </View>
                }
        </SafeAreaView>
      </LinearGradient>
      
  </>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#041187",
    flex:1,
    
  },
  
  safeArea: {
    padding: 10,
    paddingHorizontal: 15
  },
  otherInfoContainer: {
    display: 'flex',
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    rowGap: 15
  },
  centeredMessage: {
    
      display: 'flex',
      height: '80%',
      justifyContent: 'center',
      alignItems: 'center'
    
  }
});
