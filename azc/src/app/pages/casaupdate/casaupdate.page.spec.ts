import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CasaupdatePage } from './casaupdate.page';

describe('CasaupdatePage', () => {
  let component: CasaupdatePage;
  let fixture: ComponentFixture<CasaupdatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CasaupdatePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CasaupdatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
