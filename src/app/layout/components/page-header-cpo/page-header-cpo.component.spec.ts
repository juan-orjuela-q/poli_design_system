/// <reference types="jasmine" />
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PageHeaderCpoComponent } from './page-header-cpo.component';

describe('PageHeaderCpoComponent', () => {
  let component: PageHeaderCpoComponent;
  let fixture: ComponentFixture<PageHeaderCpoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageHeaderCpoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PageHeaderCpoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
