import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaskLoaderComponent } from './mask-loader.component';

describe('MaskLoaderComponent', () => {
  let component: MaskLoaderComponent;
  let fixture: ComponentFixture<MaskLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaskLoaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaskLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
