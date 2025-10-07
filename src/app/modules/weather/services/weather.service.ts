import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, switchMap } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  weather = environment.weather;
  forecast = environment.forecast;



  constructor(private http: HttpClient) { }

  getWeatherByCity(city: string): Observable<any> {
    return this.http.get(`${this.weather}?q=${city}&units=metric&appid=${environment.openWeatherApiKey}`).pipe(
      map((res: any) => ({
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

  getForecast(city: string) {
    return this.http.get(`${this.forecast}?q=${city}&units=metric&appid=${environment.openWeatherApiKey}`)
  }


}
