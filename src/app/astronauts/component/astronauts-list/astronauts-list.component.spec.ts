import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AstronautsListComponent } from './astronauts-list.component';

describe('AstronautsListComponent', () => {
  let component: AstronautsListComponent;
  let fixture: ComponentFixture<AstronautsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AstronautsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AstronautsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
