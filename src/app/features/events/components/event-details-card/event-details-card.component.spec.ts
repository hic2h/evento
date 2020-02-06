import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { EventDetailsCardComponent } from "./event-details-card.component";
import { By } from "@angular/platform-browser";

const mockEvent = {
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
};

describe("EventDetailsCardComponent", () => {
  let component: EventDetailsCardComponent;
  let fixture: ComponentFixture<EventDetailsCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EventDetailsCardComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventDetailsCardComponent);
    component = fixture.componentInstance;
    component.event = mockEvent;
    fixture.detectChanges();
  });

  it("The card should display correct event details", () => {
    const titleElement = fixture.debugElement.query(By.css(".title"));
    expect(titleElement).toBeDefined();
    expect(titleElement.nativeElement.innerHTML).toEqual(mockEvent.title);

    const descElement = fixture.debugElement.query(By.css("[nz-paragraph]"));
    expect(descElement).toBeDefined();
    expect(descElement.nativeElement.innerHTML).toEqual(mockEvent.description);
  });

  it("delete EventEmitter should be triggered when delete button is clicked delete", () => {
    let eventId: string;
    component.delete.subscribe(emittedEventId => (eventId = emittedEventId));

    component.deleteEvent(mockEvent.id);
    expect(eventId).toEqual(mockEvent.id);
  });
});
