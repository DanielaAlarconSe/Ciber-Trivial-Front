import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TriviasComponent } from './trivias.component';

describe('TriviasComponent', () => {
  let component: TriviasComponent;
  let fixture: ComponentFixture<TriviasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TriviasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TriviasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
