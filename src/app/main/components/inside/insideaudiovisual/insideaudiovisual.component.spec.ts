import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsideaudiovisualComponent } from './insideaudiovisual.component';

describe('InsideaudiovisualComponent', () => {
  let component: InsideaudiovisualComponent;
  let fixture: ComponentFixture<InsideaudiovisualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InsideaudiovisualComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InsideaudiovisualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
