import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapstoneComponent } from './capstone.component';

describe('CapstoneComponent', () => {
  let component: CapstoneComponent;
  let fixture: ComponentFixture<CapstoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CapstoneComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CapstoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
