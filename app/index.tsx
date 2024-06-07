import { useEffect, useState } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { SafeAreaView } from 'react-native-safe-area-context';
import WeatherDegree from '@/components/WeatherDegree';
import { LinearGradient } from 'expo-linear-gradient';
import CustomSearchBar from '@/components/CustomSearchBar';
import { UserLocation } from './utils/location';
import WeatherCardInfo from '@/components/WeatherCardInfo';
import Humidity from '@/assets/icons/humidity.svg';
import Wind from '@/assets/icons/wind.svg';
import Pressure from '@/assets/icons/wind.svg';
import Visibility from '@/assets/icons/eye.svg';
import TimingWeather from '@/components/TimingWeather';
import { WeatherInformation, WeatherLocation } from './utils/weatherInfo';
import ErrorMessage from '@/components/ErrorMessage';

export interface GeoLocation {
  longitude: number,
  latitude: number,
}

export default function HomeScreen() {
  const [loadingWeather, setLoadingWeather ] = useState<boolean>(false);
  const [isPermissionAllowed, setIsPermissionAllowed] = useState<boolean>(true);
  const [location, setLocation] = useState<GeoLocation>({longitude: 0, latitude:0})
  const [weatherInfo, setWeatherInfo] = useState<WeatherInformation>();
  const [error, setError] = useState('');

  const successBackground = [ '#5A99E0','#5B9ADF','#7DB2D4'];
  const errorBackground = [ '#E03E3E','#7A2222','#7A2222'];

  useEffect(() => {
    getLocation();
  }, [])

  async function getLocation(city?: string) {
    setLoadingWeather(true);
    const locationInstance = new UserLocation();
    const initiated = await initiatePermission(locationInstance);

    if(initiated) {
      const getLocation = await locationInstance.getCurrentLocation();
      if(getLocation[0]) {
        const location: GeoLocation = getLocation[1] as GeoLocation;
        const locationInstance = await fetchLocationInstance(city, location);
        await updateWeatherInfo(locationInstance);
      } else {
        setError("Error Getting your Location")
      }
    }
    setLoadingWeather(false);
  }

  async function fetchLocationInstance(city: string | undefined, location: GeoLocation) {
    if(city && city.length > 0) {
      console.log('dd');
      return await getByCity(city);
    } else {
      
      return await getWeatherLocation(location.longitude, location.latitude);
    }
  }

  async function updateWeatherInfo(locationInstance: any) {
    const instance: WeatherInformation = new WeatherInformation(locationInstance);
    if(instance.status == 200) {
      setWeatherInfo(instance);
      setError('');
    } else {
      setError(instance.message)
    }
  }

  async function getWeatherLocation(longitude:number, latitude:number) {
    const weatherAPIInstance = new WeatherLocation(longitude, latitude);
    return await weatherAPIInstance.getCurrentLocation();
  }

  async function getByCity(city: string) {
    const weatherAPIInstance = new WeatherLocation(0, 0);
    return await weatherAPIInstance.getByCity(city);
  }

  async function initiatePermission(locationInstance: UserLocation) {  
    const getCurrentLocation = await locationInstance.getCurrentLocation();
    if(!getCurrentLocation[0]) {
      setIsPermissionAllowed(false);
      return false;
    } else {
      setIsPermissionAllowed(true);
      return true;
    }
  }

  return (
    <>
        <LinearGradient 
            colors={ error.length > 0 ? errorBackground : successBackground}
            style={styles.container}>
          <SafeAreaView style={styles.safeArea}>
                <CustomSearchBar onSearch={(value) => getLocation(value)} />
                  {
                    !loadingWeather ? 
                      isPermissionAllowed ? 
                        error.length > 0 ? 
                          <ErrorMessage message={error}/>
                          :
                            <View>
                              <WeatherDegree city={`${weatherInfo?.cityName}, ${weatherInfo?.country}` ?? ''} degreeCelcius={Number(weatherInfo?.temperature ?? 0)} 
                              currentWeather={ weatherInfo?.description ?? weatherInfo?.weatherStatus ?? ''}/>
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
                              
                        <TimingWeather sunrise={weatherInfo?.sunrise ?? 20} 
                            sunset={weatherInfo?.sunset ?? 0} timezone={weatherInfo?.timezone ?? 0}/>
                            
                      </View> 
                      : 
                      <View style={styles.centeredMessage}>
                        <ThemedText>Permission is not Granted please grant Permission in your settings</ThemedText>
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
    
  },

  errorText: {
    fontSize: 35,
    fontWeight: 'bold'
  }
});
