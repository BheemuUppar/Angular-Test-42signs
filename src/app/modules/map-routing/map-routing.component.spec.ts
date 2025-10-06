import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapRoutingComponent } from './map-routing.component';

describe('MapRoutingComponent', () => {
  let component: MapRoutingComponent;
  let fixture: ComponentFixture<MapRoutingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MapRoutingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MapRoutingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
