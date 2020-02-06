import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { FeaturedEventsComponent } from "./featured-events.component";
import { By } from "@angular/platform-browser";

describe("FeaturedEventsComponent", () => {
  let component: FeaturedEventsComponent;
  let fixture: ComponentFixture<FeaturedEventsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FeaturedEventsComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeaturedEventsComponent);
    component = fixture.componentInstance;
  });

  it("the carousel should contains 2 event elements", () => {
    component.featuredEvents = [
      {
        id: "71iDjgp9Pe64sNtBS1lo",
        address:
          "Rocade de Rabat, Riad, Agdal Riyad, Rabat, pachalik de Rabat, Prefecture of Rabat, Rabat-Salé-Kenitra, 10160, Morocco",
        category: "Comedy",
        coverImage:
          "https://avenueevents.co.uk/wp-content/uploads/2015/09/fragrance-training-conference-5.jpg",
        description: "Description Event",
        featured: true,
        host: "Hicham",
        period: {
          endDate: "Wed Feb 010 2020 09:04:32 GMT+0100 (GMT+01:00)",
          startDate: "Wed Feb 05 2020 09:04:32 GMT+0100 (GMT+01:00)"
        },
        price: 0,
        title: "Event updated 2"
      },
      {
        id: "C4bpptHQs1Sr6f5giwOu",
        address:
          "Rocade de Rabat, Riad, Agdal Riyad, Rabat, pachalik de Rabat, Prefecture of Rabat, Rabat-Salé-Kenitra, 10160, Morocco",
        category: "Comedy",
        coverImage:
          "https://avenueevents.co.uk/wp-content/uploads/2015/09/fragrance-training-conference-5.jpg",
        description: "Description Event",
        featured: true,
        host: "Hicham",
        period: {
          endDate: "Wed Feb 010 2020 09:04:32 GMT+0100 (GMT+01:00)",
          startDate: "Tue Feb 06 2020 09:04:32 GMT+0100 (GMT+01:00)"
        },
        price: 0,
        title: "Event updated 3"
      }
    ];
    fixture.detectChanges();
    const carouselElement = fixture.debugElement.queryAll(
      By.css("[nz-carousel-content]")
    );
    expect(carouselElement).toBeDefined();
    expect(carouselElement.length).toBe(2);
  });
});
