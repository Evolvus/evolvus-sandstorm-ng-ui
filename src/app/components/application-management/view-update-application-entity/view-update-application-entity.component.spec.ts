import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewUpdateApplicationEntityComponent } from './view-update-application-entity.component';

describe('ViewUpdateApplicationEntityComponent', () => {
  let component: ViewUpdateApplicationEntityComponent;
  let fixture: ComponentFixture<ViewUpdateApplicationEntityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewUpdateApplicationEntityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewUpdateApplicationEntityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
