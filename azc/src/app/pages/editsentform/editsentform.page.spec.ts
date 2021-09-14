import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditsentformPage } from './editsentform.page';

describe('EditsentformPage', () => {
  let component: EditsentformPage;
  let fixture: ComponentFixture<EditsentformPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditsentformPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditsentformPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
