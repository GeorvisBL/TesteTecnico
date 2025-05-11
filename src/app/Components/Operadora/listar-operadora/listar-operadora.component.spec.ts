import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarOperadoraComponent } from './listar-operadora.component';

describe('ListarOperadoraComponent', () => {
  let component: ListarOperadoraComponent;
  let fixture: ComponentFixture<ListarOperadoraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListarOperadoraComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarOperadoraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
