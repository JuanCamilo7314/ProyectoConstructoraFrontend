import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RespuestaSolicitudComponent } from './respuesta-solicitud.component';

describe('RespuestaSolicitudComponent', () => {
  let component: RespuestaSolicitudComponent;
  let fixture: ComponentFixture<RespuestaSolicitudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RespuestaSolicitudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RespuestaSolicitudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
