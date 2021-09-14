import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UpdatesbPage } from './updatesb.page';

describe('UpdatesbPage', () => {
  let component: UpdatesbPage;
  let fixture: ComponentFixture<UpdatesbPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatesbPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UpdatesbPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
