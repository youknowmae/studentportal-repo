import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsidearticleComponent } from './insidearticle.component';

describe('InsidearticleComponent', () => {
  let component: InsidearticleComponent;
  let fixture: ComponentFixture<InsidearticleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InsidearticleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InsidearticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
