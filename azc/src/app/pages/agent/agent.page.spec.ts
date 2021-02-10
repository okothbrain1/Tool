import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AgentPage } from './agent.page';

describe('AgentPage', () => {
  let component: AgentPage;
  let fixture: ComponentFixture<AgentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgentPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AgentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
