import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserencuestaComponent } from './userencuesta.component';

describe('UserencuestaComponent', () => {
  let component: UserencuestaComponent;
  let fixture: ComponentFixture<UserencuestaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserencuestaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserencuestaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
