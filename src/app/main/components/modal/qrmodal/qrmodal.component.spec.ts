import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QrmodalComponent } from './qrmodal.component';

describe('QrmodalComponent', () => {
  let component: QrmodalComponent;
  let fixture: ComponentFixture<QrmodalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QrmodalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QrmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
