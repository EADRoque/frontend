import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GratitudeJarComponent } from './gratitude-jar.component';

describe('GratitudeJarComponent', () => {
  let component: GratitudeJarComponent;
  let fixture: ComponentFixture<GratitudeJarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GratitudeJarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GratitudeJarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
