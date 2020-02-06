import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { EventFormComponent } from "./event-form.component";
import { FormBuilder, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { CategoryService } from "@core/category.service";
import { PlacesService } from "@core/places.service";
import { NgZorroAntdModule } from "ng-zorro-antd";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";

describe("EventFormComponent", () => {
  let component: EventFormComponent;
  let fixture: ComponentFixture<EventFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EventFormComponent],
      imports: [
        NgZorroAntdModule,
        ReactiveFormsModule,
        FormsModule,
        NoopAnimationsModule
      ],
      providers: [FormBuilder, CategoryService, PlacesService],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("the event form should be invalid when it is empty", () => {
    expect(component.eventForm.valid).toBeFalse();
  });

  it("the event form becomes valid when all fields are set", () => {
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
    component.eventForm.patchValue(mockEvent);
    fixture.detectChanges();
    expect(component.eventForm.valid).toBeTrue();
  });

  it("the event title control should be invalid when it is empty", () => {
    expect(component.eventForm.controls["title"].valid).toBeFalse();
  });

  it("the event title control is valid when it is not empty", () => {
    component.eventForm.controls["title"].setValue("text");
    fixture.detectChanges();
    expect(component.eventForm.controls["title"].valid).toBeTrue();
  });
});
