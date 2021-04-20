import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NewsurveyPage } from './newsurvey.page';

describe('NewsurveyPage', () => {
  let component: NewsurveyPage;
  let fixture: ComponentFixture<NewsurveyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsurveyPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NewsurveyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
