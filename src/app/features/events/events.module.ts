import { NgModule } from "@angular/core";

import { EventsRoutingModule } from "./events-routing.module";
import { AllEventsComponent } from "./pages/all-events/all-events.component";
import { SharedModule } from "../../shared/shared.module";
import { CommonModule } from "@angular/common";
import { CreateEventPageComponent } from "./pages/create-event-page/create-event-page.component";
import { EventFormComponent } from "./components/event-form/event-form.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { EditEventPageComponent } from "./pages/edit-event-page/edit-event-page.component";
import { FeaturedEventsComponent } from "./components/featured-events/featured-events.component";
import { EventCardComponent } from "./components/event-card/event-card.component";
import { EventDetailsPageComponent } from "./pages/event-details-page/event-details-page.component";
import { EventDetailsCardComponent } from "./components/event-details-card/event-details-card.component";
import { SearchPageComponent } from "./pages/search-page/search-page.component";
import { EventsComponent } from "./events.component";

@NgModule({
  declarations: [
    EventsComponent,
    AllEventsComponent,
    CreateEventPageComponent,
    EventFormComponent,
    EditEventPageComponent,
    FeaturedEventsComponent,
    EventCardComponent,
    EventDetailsPageComponent,
    EventDetailsCardComponent,
    SearchPageComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    EventsRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class EventsModule {}
