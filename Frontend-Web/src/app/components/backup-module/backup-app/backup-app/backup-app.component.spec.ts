import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BackupAppComponent } from './backup-app.component';

describe('BackupAppComponent', () => {
  let component: BackupAppComponent;
  let fixture: ComponentFixture<BackupAppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BackupAppComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BackupAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
