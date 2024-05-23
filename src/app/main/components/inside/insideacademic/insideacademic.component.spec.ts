import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsideacademicComponent } from './insideacademic.component';

describe('InsideacademicComponent', () => {
  let component: InsideacademicComponent;
  let fixture: ComponentFixture<InsideacademicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InsideacademicComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InsideacademicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
