import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSuscriptorComponent } from './form-suscriptor.component';

describe('FormSuscriptorComponent', () => {
  let component: FormSuscriptorComponent;
  let fixture: ComponentFixture<FormSuscriptorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormSuscriptorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormSuscriptorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
