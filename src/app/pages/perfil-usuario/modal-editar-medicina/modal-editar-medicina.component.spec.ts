import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditarMedicinaComponent } from './modal-editar-medicina.component';

describe('ModalEditarMedicinaComponent', () => {
  let component: ModalEditarMedicinaComponent;
  let fixture: ComponentFixture<ModalEditarMedicinaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalEditarMedicinaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalEditarMedicinaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
