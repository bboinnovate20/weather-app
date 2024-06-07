import { API_KEY, weatherAPI } from "@/constants/_apiKey";



export class WeatherLocation {
	longitude: number;
	latitude: number;

    private apiKey = API_KEY;

	constructor(longitude: number, latitude: number) {
		this.longitude = longitude;
		this.latitude = latitude;
	}

    async getCurrentLocation() {
        const customAPI = `${weatherAPI}?lat=${this.latitude}&lon=${this.longitude}&appid=${this.apiKey}`
        const getWeatherInfo = await fetch(customAPI);
        const response = await getWeatherInfo.json();
        return response;
    }

    async getByCity(city: string) {
        const customAPI = `${weatherAPI}?q=${city}&appid=${this.apiKey}`
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
    timezone: number;
    country: string;

    constructor(json: any){

        this.humidity = json['main']?.['humidity'] ?? 0 as number;
        this.wind = json['wind']?.['speed'] ??0 as number; 
        this.pressure= json['main']?.['pressure'] ?? 0 as number; 
        this.visibility = json['visibility'] ?? 0 as number; 
        this.weatherStatus =json['weather']?.[0]?.['main'] ?? '' as string; ;
        this.description =json['weather']?.[0]?.['description']?? '' as string; ;
        this.cityName= json['name'] ?? '';
        this.sunrise= json['sys']?.['sunrise'] ?? 0;
        this.sunset=  json['sys']?.['sunset'] ?? 0;
        this.temperature =  json['main']?.['temp'] ?? 0;
        this.status = json['cod'] ?? 400 as number;
        this.message = json['message'] ?? '';
        this.timezone = json['timezone'] ?? 0;
        this.country = json['sys']?.['country'] ?? 0;
        
    }


}