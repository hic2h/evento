import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AllEventsComponent } from "./pages/all-events/all-events.component";
import { CreateEventPageComponent } from "./pages/create-event-page/create-event-page.component";
import { EditEventPageComponent } from "./pages/edit-event-page/edit-event-page.component";
import { EventDetailsPageComponent } from "./pages/event-details-page/event-details-page.component";
import { SearchPageComponent } from "./pages/search-page/search-page.component";

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    component: AllEventsComponent
  },
  {
    path: "search",
    pathMatch: "full",
    component: SearchPageComponent
  },
  {
    path: "create",
    pathMatch: "full",
    component: CreateEventPageComponent
  },
  {
    path: ":eventId",
    pathMatch: "full",
    component: EventDetailsPageComponent
  },
  {
    path: ":eventId/edit",
    pathMatch: "full",
    component: EditEventPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventsRoutingModule {}
