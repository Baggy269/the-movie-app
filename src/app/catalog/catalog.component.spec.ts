import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { CatalogComponent } from './catalog.component';
import { By } from '@angular/platform-browser';

describe('CatalogComponent', () => {
  let component: CatalogComponent;
  let fixture: ComponentFixture<CatalogComponent>;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ CatalogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatalogComponent);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have the attributes initialized correctly', () => {
    expect(component.nextPage).toBe(1);
    expect(component.totalPages).toBe(1);
    expect(component.selected).toBe(-1);
    expect(component.topRatedUrl).toBe('http://localhost:8080/movies/');
    expect(component.posterPrefix).toBe('https://image.tmdb.org/t/p/w500');
    expect(component.movies).toHaveSize(0);
  });

  it('should fetch movies correctly', ()=>{
    component.ngOnInit()
    // expect(component.movies).toHaveSize(20)
  })

  it('should load movies correctly in DOM', ()=>{
    // let moviesRendered = fixture.debugElement.queryAll(By.css('mat-card'));
  })

});
