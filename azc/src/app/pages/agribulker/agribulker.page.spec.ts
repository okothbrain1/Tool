import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AgribulkerPage } from './agribulker.page';

describe('AgribulkerPage', () => {
  let component: AgribulkerPage;
  let fixture: ComponentFixture<AgribulkerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgribulkerPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AgribulkerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
