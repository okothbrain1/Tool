import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NotsentPage } from './notsent.page';

describe('NotsentPage', () => {
  let component: NotsentPage;
  let fixture: ComponentFixture<NotsentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotsentPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NotsentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
