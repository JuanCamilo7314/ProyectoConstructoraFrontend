import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudEstudioComponent } from './solicitud-estudio.component';

describe('SolicitudEstudioComponent', () => {
  let component: SolicitudEstudioComponent;
  let fixture: ComponentFixture<SolicitudEstudioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolicitudEstudioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitudEstudioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
