

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherService } from './services/weather.service';
import { Subject, debounceTime, forkJoin, catchError, of, tap } from 'rxjs';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css'],
  providers: [WeatherService],
})
export class WeatherComponent {
  currentCity: string = 'Bengaluru';
  currentWeather: any;
  forecastWeather: { date: string; avgTemp: number }[] = [];
  dailyData: { [date: string]: number[] } = {};
  loading = false;
  error = false;
  searchSubject = new Subject<string>();

  constructor(private weatherService: WeatherService) {
    // initial load
    this.fetchAllData(this.currentCity);

    // handle debounce search
    this.searchSubject.pipe(debounceTime(500)).subscribe((value) => {
      if (value){
         this.currentCity = value;
         this.fetchAllData(value);
      } 
    });
  }

  onSearchChange(event: any) {
    const city = event.target.value.trim();
    if (city){
     this.searchSubject.next(city);
    } else{
      this.searchSubject.next('Bengaluru');

    }
  }

  /**
   * Fetch both APIs in parallel
   */
  fetchAllData(city: string) {
    this.loading = true;
    this.error = false;

    const currentWeather$ = this.weatherService.getWeatherByCity(city);
    const forecast$ = this.weatherService.getForecast(city);

    forkJoin([currentWeather$, forecast$])
      .pipe(
        tap(([weather, forecast]) => {
          this.currentCity = city;
          this.currentWeather = weather;
          this.groupIntoDaywise(forecast);
          this.forecastWeather = this.getForecast();
        }),
        catchError((err) => {
          console.error(err);
          this.error = true;
            this.currentWeather = undefined;
          this.forecastWeather = []
          return of(null);
        }),
        tap(() => {
         
            this.loading = false
         
        })
      )
      .subscribe({next:()=>{
     
      },
    error:()=>{
      this.error = true
      this.loading = false;
    
    }});
  }

 
  groupIntoDaywise(res: any) {
    this.dailyData = {};
    res.list.forEach((item: any) => {
      const date = item.dt_txt.split(' ')[0];
      if (!this.dailyData[date]) this.dailyData[date] = [];
      this.dailyData[date].push(item.main.temp);
    });
  }

  
  getForecast() {
    const allDays = Object.keys(this.dailyData).slice(1, 5); // 4 days 
    const forecast = allDays.map((date) => {
      const temps = this.dailyData[date];
      const avgTemp = temps.reduce((a, b) => a + b, 0) / temps.length;
      return { date, avgTemp: Math.round(avgTemp) };
    });
    return forecast;
  }

  retryWeather() {
    this.fetchAllData(this.currentCity);
  }
}
