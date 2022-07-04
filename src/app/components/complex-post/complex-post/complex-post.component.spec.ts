import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplexPostComponent } from './complex-post.component';

describe('ComplexPostComponent', () => {
  let component: ComplexPostComponent;
  let fixture: ComponentFixture<ComplexPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComplexPostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComplexPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
