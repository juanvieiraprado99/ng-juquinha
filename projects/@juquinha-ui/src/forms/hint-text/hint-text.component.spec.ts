import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HintTextComponent } from './hint-text.component';

describe('HintTextComponent', () => {
  let component: HintTextComponent;
  let fixture: ComponentFixture<HintTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HintTextComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HintTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
