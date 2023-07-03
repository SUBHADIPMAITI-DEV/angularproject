import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavberComponent } from './navber.component';

describe('NavberComponent', () => {
  let component: NavberComponent;
  let fixture: ComponentFixture<NavberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavberComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
