import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsideannouncementComponent } from './insideannouncement.component';

describe('InsideannouncementComponent', () => {
  let component: InsideannouncementComponent;
  let fixture: ComponentFixture<InsideannouncementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InsideannouncementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InsideannouncementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
