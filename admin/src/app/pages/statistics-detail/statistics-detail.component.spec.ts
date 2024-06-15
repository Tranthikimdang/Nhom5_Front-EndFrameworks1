import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticsDetailComponent } from './statistics-detail.component';

describe('StatisticsDetailComponent', () => {
  let component: StatisticsDetailComponent;
  let fixture: ComponentFixture<StatisticsDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatisticsDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatisticsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
