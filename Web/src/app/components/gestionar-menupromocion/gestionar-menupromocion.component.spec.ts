import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionarMenupromocionComponent } from './gestionar-menupromocion.component';

describe('GestionarMenupromocionComponent', () => {
  let component: GestionarMenupromocionComponent;
  let fixture: ComponentFixture<GestionarMenupromocionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionarMenupromocionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionarMenupromocionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
