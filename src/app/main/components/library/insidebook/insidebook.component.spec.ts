import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsidebookComponent } from './insidebook.component';

describe('InsidebookComponent', () => {
  let component: InsidebookComponent;
  let fixture: ComponentFixture<InsidebookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InsidebookComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InsidebookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
