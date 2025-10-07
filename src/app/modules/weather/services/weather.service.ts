import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, switchMap } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  // geoUrl = 'http://api.openweathermap.org/geo/1.0/direct';
  // forcastUrl = 'https://api.openweathermap.org/data/3.0/onecall';

  weather = 'https://api.openweathermap.org/data/2.5/weather'
  forecast = 'https://api.openweathermap.org/data/2.5/forecast';



  constructor(private http:HttpClient) { }

 getWeatherByCity(city: string):Observable<any> {
  return this.http.get(`${this.weather}?q=${city}&units=metric&appid=${environment.openWeatherApiKey}`).pipe(
        map((res:any) => ({
          temp: res.main.temp,
          feels_like: res.main.feels_like,
          temp_min: res.main.temp_min,
          temp_max: res.main.temp_max,
          description: res.weather[0].description,
          icon: `https://openweathermap.org/img/wn/${res.weather[0].icon}@2x.png`,
          city: res.name,
          country: res.sys.country
        }))
      );
  }

  getForecast(city:string){
return this.http.get(`${this.forecast}?q=${city}&units=metric&appid=${environment.openWeatherApiKey}`)
  }


}
