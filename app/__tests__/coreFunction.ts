import { WeatherInformation } from "@/app/utils/weatherInfo";


describe('weatherInfo', () => {
  it('mock API Error Repsnse', async () => {
    const mockAPIErrorResponse = {
      status: 400,
      message: 'errorFound',
    };
    
    const weatherInfo = new WeatherInformation(mockAPIErrorResponse);

    expect(weatherInfo.message).toEqual('errorFound');
    expect(weatherInfo.status).toEqual(400);
  })
});


describe('weatherInfo', () => {

    it('mock API Success Repsnse', async () => {
      const mockAPIErrorResponse = {
        "coord": {
          "lon": 3.75,
          "lat": 6.5833
        },
        "weather": [
          {
            "id": 804,
            "main": "Clouds",
            "description": "overcast clouds",
            "icon": "04n"
          }
        ],
        "base": "stations",
        "main": {
          "temp": 298.99,
          "feels_like": 299.9,
          "temp_min": 298.99,
          "temp_max": 298.99,
          "pressure": 1015,
          "humidity": 87,
          "sea_level": 1015,
          "grnd_level": 1015
        },
        "visibility": 10000,
        "wind": {
          "speed": 1.8,
          "deg": 224,
          "gust": 5.43
        },
        "clouds": {
          "all": 90
        },
        "dt": 1717794441,
        "sys": {
          "country": "NG",
          "sunrise": 1717738159,
          "sunset": 1717783129
        },
        "timezone": 3600,
        "id": 2332453,
        "name": "Lagos",
        "cod": 200
      };
      
      const weatherInfo = new WeatherInformation(mockAPIErrorResponse);
  
      expect(weatherInfo.status).toEqual(200); //Success!!
      expect(weatherInfo.weatherStatus).toEqual('Clouds');
      expect(weatherInfo.humidity).toEqual(87);
      expect(weatherInfo.sunset).toEqual(1717783129);
    })
  });
  