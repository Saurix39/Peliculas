import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeliculasXcategoriaComponent } from './peliculas-xcategoria.component';

describe('PeliculasXcategoriaComponent', () => {
  let component: PeliculasXcategoriaComponent;
  let fixture: ComponentFixture<PeliculasXcategoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PeliculasXcategoriaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PeliculasXcategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
