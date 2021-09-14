import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FarmerprofilePage } from './farmerprofile.page';

describe('FarmerprofilePage', () => {
  let component: FarmerprofilePage;
  let fixture: ComponentFixture<FarmerprofilePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FarmerprofilePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FarmerprofilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
