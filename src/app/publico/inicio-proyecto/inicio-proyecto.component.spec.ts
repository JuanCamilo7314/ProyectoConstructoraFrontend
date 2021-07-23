import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InicioProyectoComponent } from './inicio-proyecto.component';

describe('InicioProyectoComponent', () => {
  let component: InicioProyectoComponent;
  let fixture: ComponentFixture<InicioProyectoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InicioProyectoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InicioProyectoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
