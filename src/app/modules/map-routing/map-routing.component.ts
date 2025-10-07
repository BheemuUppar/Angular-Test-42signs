import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import * as L from 'leaflet';
import { MapService } from './services/map.service';
import { debounceTime, from, Subject, switchMap } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { FormatDurationPipe } from '../../core/pipes/durationFormate.pipe';
import { FormatkmPipe } from '../../core/pipes/kmFormate.pipe';
@Component({
  selector: 'app-map-routing',
  imports: [CommonModule, FormsModule, FormatDurationPipe,FormatkmPipe ],
  templateUrl: './map-routing.component.html',
  styleUrl: './map-routing.component.css'
})
export class MapRoutingComponent implements AfterViewInit , OnInit{
  map: any;
  showRouteForm:boolean = false;
fromSubject:Subject<any> = new  Subject();
toSubject:Subject<any> = new  Subject();
  fromSuggestions: any[] = [];
  toSuggestions: any[] = [];
  fromLocation: any;
  toLocation: any;
  routeLayer: any;
   routeInfo: any = undefined;
  fromMarker !: L.Marker<any> | null; 
  toMarker !: L.Marker<any> | null; 
  fromIcon = L.icon({
  iconUrl: environment.mapfromIcon, 
  iconSize: [32, 32],               // size of the icon
  iconAnchor: [16, 32],             // point of the icon which will correspond to marker's location
  popupAnchor: [0, -32]             // point from which the popup should open relative to the iconAnchor
});
  toIcon = L.icon({
  iconUrl: environment.mapToIcon,
  iconSize: [32, 32],               // size of the icon
  iconAnchor: [16, 32],             // point of the icon which will correspond to marker's location
  popupAnchor: [0, -32]             // point from which the popup should open relative to the iconAnchor
});

  constructor(private mapService:MapService) {

  }

  ngOnInit(): void {
    this.fromSubject
      .pipe(
        debounceTime(400),
        switchMap((q) => this.mapService.searchLocation(q))
      )
      .subscribe(
        {
          next:(results)=>{
            this.fromSuggestions = results.length ? results : [{ display_name: 'No results found' }];

          },
          error:(err)=>{
            console.log(err)
          }
        }
        
    
  );
    this.toSubject
      .pipe(
        debounceTime(400),
        switchMap((q) => this.mapService.searchLocation(q))
      )
      .subscribe(
        {
          next:(results)=>{
            this.toSuggestions = results.length ? results : [{ display_name: 'No results found' }];

          },
          error:(err)=>{
            console.log(err)
          }
        }
        
    
  );
  }

  onFromInput(event:any){
    this.fromSubject.next(event.target.value)

  }
  onToInput(event:any){
   this.toSubject.next(event.target.value);
   
  }

  getRoute(){
  // console.log(this.fromLocation , this.toLocation)
  this.routeLayer = undefined;
    this.routeInfo = undefined
    this. fromSuggestions= [];
  this.toSuggestions = [];
 

  if (this.routeLayer) {
      this.map.removeLayer(this.routeLayer);
    }
  this.mapService.getRoute([this.fromLocation.lat , this.fromLocation.lon],
    [this.toLocation.lat , this.toLocation.lon]
   ).subscribe({
    next:(data:any)=>{
        const route = data.routes[0];
        const coords = route.geometry.coordinates.map((c: any) => [c[1], c[0]]); // flip lng,lat
        this.routeLayer = L.polyline(coords, { color: 'blue', weight: 4 }).addTo(this.map);
        this.map.fitBounds(this.routeLayer.getBounds());
     this.fromMarker = L.marker([this.fromLocation.lat, this.fromLocation.lon], { icon: this.fromIcon }).addTo(this.map);
      this.fromMarker.bindPopup('From: ' + this.fromLocation.display_name).openPopup();
       this.toMarker = L.marker([this.toLocation.lat, this.toLocation.lon], { icon: this.toIcon }).addTo(this.map);
      this.toMarker.bindPopup('To: ' + this.toLocation.display_name).openPopup();
        this.routeInfo = {
          distance: route.distance / 1000,
          duration: route.duration ,
        };
        console.log(this.routeInfo)
    },
    error:(err)=>{

    }
   })
  }


  ngAfterViewInit(): void {
    // initialize map
    this.map = L.map('map', { center: [12.9716, 77.5946], zoom: 12 }); // default Bengaluru
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.map);

  }

  selectFromPlace(type:'from' | 'to' , selectedPlace:any){
  
  if(type == 'from'){
    this.fromLocation = selectedPlace;
    this.fromSuggestions = [];
     
  }else{
    this.toLocation = selectedPlace;
    this.toSuggestions = [];
  }

  }

  clearRoute(){
    if (this.routeLayer) {
      this.map.removeLayer(this.routeLayer);
    }
    this.routeLayer = undefined;
    this.routeInfo = undefined
    this. fromSuggestions= [];
  this.toSuggestions = [];
  
  // Remove markers
if (this.fromMarker) {
  this.fromMarker.remove();
  this.fromMarker = null;
}

if (this.toMarker) {
  this.toMarker.remove();
  this.toMarker = null;
}
  }
}