import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddNomePage } from './add-nome.page';

describe('AddNomePage', () => {
  let component: AddNomePage;
  let fixture: ComponentFixture<AddNomePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNomePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddNomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
