import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColumnComponentComponent } from './column-component.component';

describe('ColumnComponentComponent', () => {
  let component: ColumnComponentComponent;
  let fixture: ComponentFixture<ColumnComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ColumnComponentComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ColumnComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
