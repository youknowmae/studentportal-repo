import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsidedashboardComponent } from './insidedashboard.component';

describe('InsidedashboardComponent', () => {
  let component: InsidedashboardComponent;
  let fixture: ComponentFixture<InsidedashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InsidedashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InsidedashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
