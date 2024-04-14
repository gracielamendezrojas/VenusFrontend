import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogPostsComponent } from './dialog-posts.component';

describe('DialogPostsComponent', () => {
  let component: DialogPostsComponent;
  let fixture: ComponentFixture<DialogPostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogPostsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
