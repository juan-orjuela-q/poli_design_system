import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PageSidebarCpoComponent } from './page-sidebar-cpo.component';

describe('PageSidebarCpoComponent', () => {
  let component: PageSidebarCpoComponent;
  let fixture: ComponentFixture<PageSidebarCpoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageSidebarCpoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PageSidebarCpoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
