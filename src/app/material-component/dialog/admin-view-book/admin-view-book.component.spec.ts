import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminViewBookComponent } from './admin-view-book.component';

describe('AdminViewBookComponent', () => {
  let component: AdminViewBookComponent;
  let fixture: ComponentFixture<AdminViewBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminViewBookComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminViewBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
