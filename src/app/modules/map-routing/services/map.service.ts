import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  constructor(private http:HttpClient) { }

   searchLocation(query: string): Observable<any> {
    return this.http.get(environment.mapBaseUrl+'/search', {
      params: {
        q: query,
        format: 'json',
        addressdetails: '1',
        limit: '5'
      }
    });
  }

  getRoute(from: [number, number], to: [number, number]) {
  const url = `https://router.project-osrm.org/route/v1/driving/${from[1]},${from[0]};${to[1]},${to[0]}?overview=full&geometries=geojson`;
  return this.http.get(url);
}

}
