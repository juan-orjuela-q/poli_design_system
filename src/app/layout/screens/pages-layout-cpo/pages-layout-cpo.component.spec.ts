import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PagesLayoutCpoComponent } from './pages-layout-cpo.component';

describe('PagesLayoutCpoComponent', () => {
  let component: PagesLayoutCpoComponent;
  let fixture: ComponentFixture<PagesLayoutCpoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PagesLayoutCpoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PagesLayoutCpoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
