import { API_KEY, weatherAPI } from "@/constants/_apiKey";
import * as Location from "expo-location";

export class UserLocation {
	constructor() {
		this.initiateLocation();
	}
	async initiateLocation() {
		let { status } = await Location.requestForegroundPermissionsAsync();
		if (status !== "granted") {
			return false;
		}
		return true;
	}

	async getCurrentLocation() {
		const checkLocationPermitted = await this.initiateLocation();
		if (checkLocationPermitted) {
			let location = await Location.getCurrentPositionAsync({});
			return [
				true,
				{
					longitude: location["coords"]["longitude"],
					latitude: location["coords"]["latitude"],
				},
			];
		}
		return [false, null];
	}
}

export class WeatherLocation {
	longitude = 0;
	latitude = 0;
    private apiKey = API_KEY;

	constructor(longitude: number, latitude: number) {
		longitude = this.longitude;
		latitude = this.latitude;
	}

    async getCurrentLocation() {
        const customAPI = `${weatherAPI}?lat=${this.latitude}&lon=${this.longitude}&appid=${this.apiKey}`
        const getWeatherInfo = await fetch(customAPI);
        const response = await getWeatherInfo.json();
        return response;
    }

    async getByCity(city: string) {
        const customAPI = `${weatherAPI}?q={${city}&appid=${this.apiKey}`
        const getWeatherInfo = await fetch(customAPI);
        const response = await getWeatherInfo.json();
        return response;
    }
}


export class WeatherInformation {
    humidity: number;
    wind: number;
    pressure: number;
    visibility: number;
    weatherStatus: string;
    description: string;
    cityName: string;
    sunrise: number;
    sunset: number;
    temperature: number;
    status: number;
    message: string;
    constructor(json: any){

        this.humidity = json['main']?.['humidity'] ?? 0 as number;
        this.wind = json['wind']?.['speed'] ??0 as number; 
        this.pressure= json['main']?.['pressure'] ?? 0 as number; 
        this.visibility = json['visibility'] ?? 0 as number; 
        this.weatherStatus =json['weather']?.['main'] ?? '' as string; ;
        this.description =json['weather']?.['description']?? '' as string; ;
        this.cityName= json['name'] ?? '';
        this.sunrise= json['sys']?.['sunrise'] ?? 0;
        this.sunset=  json['sys']?.['sunset'] ?? 0;
        this.temperature =  json['main']?.['temp'] ?? 0;
        this.status = json['cod'] ?? 400 as number;
        this.message = json['message'] ?? '';
    }


}