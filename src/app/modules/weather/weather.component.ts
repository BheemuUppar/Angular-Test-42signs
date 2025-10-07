// import { Component } from '@angular/core';
// import { WeatherService } from './services/weather.service';
// import { CommonModule } from '@angular/common';
// import { debounceTime, pipe, Subject } from 'rxjs';

// @Component({
//   selector: 'app-weather',
//   imports: [CommonModule],
//   templateUrl: './weather.component.html',
//   styleUrl: './weather.component.css',
//   providers:[WeatherService]
// })
// export class WeatherComponent {
//   currentCity :string = 'Bengaluru';
//   lat !: number;
//   lon !: number;
//   currentWeather: any;
//   forecastWeather !: { date: string; avgTemp: number; }[];
//   searchSubject: Subject<string> = new Subject();
// constructor(private weatherService:WeatherService){
// // this.fetchGeoCordinates()
// this.fetchWeather()
// this.fetchForecast()

// this.searchSubject.pipe(debounceTime(500)).subscribe(
//   {
//     next:(str)=>{
//         this.currentCity = str;
//         this.fetchWeather()
//         this.fetchForecast()
//     }
//   }
// )
// }


// onSearchChange(event:any){
//   if(event.target.value != ''){
//     this.searchSubject.next(event.target.value)
//   }
// }

// fetchWeather(){
//   this.weatherService.getWeatherByCity(this.currentCity).subscribe({
//     next:(res)=>{
//       this.currentWeather = res
//       console.log(res)
//     },
//     error:(err)=>{
//      alert('failed to fetch weather for location: "'+ this.currentCity+'"')
//     }
//   })
// }

//  dailyData: { [date: string]: number[] } = {};
// fetchForecast(){
//   this.weatherService.getForecast(this.currentCity).subscribe({
//     next:(res)=>{
//      this.groupIntoDaywise(res);
//      this.forecastWeather = this.getForecast()
//       // console.log(this.getForecast())
//     },
//     error:(err)=>{

//     }
//   })
// }

// groupIntoDaywise(res:any){
//   res.list.forEach((item:any) => {
//   const date = item.dt_txt.split(' ')[0];
//   if (!this.dailyData[date]) this.dailyData[date] = [];
//   this.dailyData[date].push(item.main.temp);
// });
// }

// getForecast(){
//   console.log(this.dailyData)
//   const forecast4Days = Object.keys(this.dailyData)
//   .slice(1, 5)   // Take only next 4 dates
//   .map(date => {
//     const temps = this.dailyData[date];
//     // const avgTemp = temps.reduce((a, b) => a + b, 0) / temps.length;

//     const avgTemp = temps.reduce((accTemp, currentTemp)=>{
//       return accTemp + currentTemp
//     } , 0) / temps.length
//     return { date, avgTemp: Math.round(avgTemp) };
//   });
//   return forecast4Days
// }
// }


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
      // this.currentWeather = undefined;
      // this.forecastWeather = []
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
