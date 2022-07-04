import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildingPostComponent } from './building-post.component';

describe('BuildingPostComponent', () => {
  let component: BuildingPostComponent;
  let fixture: ComponentFixture<BuildingPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuildingPostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuildingPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
