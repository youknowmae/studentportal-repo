import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsideborrowedComponent } from './insideborrowed.component';

describe('InsideborrowedComponent', () => {
  let component: InsideborrowedComponent;
  let fixture: ComponentFixture<InsideborrowedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InsideborrowedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InsideborrowedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
