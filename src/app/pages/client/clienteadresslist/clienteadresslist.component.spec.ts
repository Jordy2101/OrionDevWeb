import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteadresslistComponent } from './clienteadresslist.component';

describe('ClienteadresslistComponent', () => {
  let component: ClienteadresslistComponent;
  let fixture: ComponentFixture<ClienteadresslistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClienteadresslistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClienteadresslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
