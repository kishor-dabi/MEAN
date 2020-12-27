import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeveloperAddComponent } from './developer-add.component';

describe('DeveloperAddComponent', () => {
  let component: DeveloperAddComponent;
  let fixture: ComponentFixture<DeveloperAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeveloperAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeveloperAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
