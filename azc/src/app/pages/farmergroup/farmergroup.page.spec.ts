import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FarmergroupPage } from './farmergroup.page';

describe('FarmergroupPage', () => {
  let component: FarmergroupPage;
  let fixture: ComponentFixture<FarmergroupPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FarmergroupPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FarmergroupPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
