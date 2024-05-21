import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsideperiodicalComponent } from './insideperiodical.component';

describe('InsideperiodicalComponent', () => {
  let component: InsideperiodicalComponent;
  let fixture: ComponentFixture<InsideperiodicalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InsideperiodicalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InsideperiodicalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
