import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FfPage } from './ff.page';

describe('FfPage', () => {
  let component: FfPage;
  let fixture: ComponentFixture<FfPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FfPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FfPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
