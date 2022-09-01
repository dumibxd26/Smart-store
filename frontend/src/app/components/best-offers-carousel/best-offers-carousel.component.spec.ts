import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BestOffersCarouselComponent } from './best-offers-carousel.component';

describe('BestOffersCarouselComponent', () => {
  let component: BestOffersCarouselComponent;
  let fixture: ComponentFixture<BestOffersCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BestOffersCarouselComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BestOffersCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
