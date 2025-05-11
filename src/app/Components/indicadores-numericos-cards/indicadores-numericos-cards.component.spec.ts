import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndicadoresNumericosCardsComponent } from './indicadores-numericos-cards.component';

describe('IndicadoresNumericosCardsComponent', () => {
  let component: IndicadoresNumericosCardsComponent;
  let fixture: ComponentFixture<IndicadoresNumericosCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndicadoresNumericosCardsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndicadoresNumericosCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
