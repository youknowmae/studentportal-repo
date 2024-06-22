import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermsmodalComponent } from './termsmodal.component';

describe('TermsmodalComponent', () => {
  let component: TermsmodalComponent;
  let fixture: ComponentFixture<TermsmodalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TermsmodalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TermsmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
