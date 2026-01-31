import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScriptureTreeComponent } from './scripture-tree.component';

describe('ScriptureTreeComponent', () => {
  let component: ScriptureTreeComponent;
  let fixture: ComponentFixture<ScriptureTreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScriptureTreeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScriptureTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
