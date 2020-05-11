import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorGutsComponent } from './editor-guts.component';

describe('EditorGutsComponent', () => {
  let component: EditorGutsComponent;
  let fixture: ComponentFixture<EditorGutsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditorGutsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorGutsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
