import { View, Text } from 'react-native'
import React from 'react'

import Sunset from '@/assets/icons/sunset.svg'
import Sunrise from '@/assets/icons/sunrise.svg'
import { checkSunriseOrSunset } from './convertTimeStamp'

export default function DetermineTimingIcon({sunset, sunrise, timezone}: {sunrise: number, sunset: number, timezone: number}) {
// const timing = timing;

  const getTimeStamp = checkSunriseOrSunset(sunset, sunrise, timezone);

  if(getTimeStamp == 'sunrise')
    return <Sunrise width={50} color={'#fffff'}/>
  
  return <Sunset width={50} color={'#fffff'}/>
  
}