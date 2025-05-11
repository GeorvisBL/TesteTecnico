import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFaturaComponent } from './add-faturas.component';

describe('AddFaturaComponent', () => {
  let component: AddFaturaComponent;
  let fixture: ComponentFixture<AddFaturaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddFaturaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddFaturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
