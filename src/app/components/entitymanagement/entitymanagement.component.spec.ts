import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntitymanagementComponent } from './entitymanagement.component';

describe('EntitymanagementComponent', () => {
  let component: EntitymanagementComponent;
  let fixture: ComponentFixture<EntitymanagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntitymanagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntitymanagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
