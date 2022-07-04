import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetsPostComponent } from './assets-post.component';

describe('AssetsPostComponent', () => {
  let component: AssetsPostComponent;
  let fixture: ComponentFixture<AssetsPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssetsPostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetsPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
