import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsidereservedComponent } from './insidereserved.component';

describe('InsidereservedComponent', () => {
  let component: InsidereservedComponent;
  let fixture: ComponentFixture<InsidereservedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InsidereservedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InsidereservedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
