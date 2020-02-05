import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { MainLayoutComponent } from "./blocks/layout/main-layout/main-layout.component";

const routes: Routes = [
  {
    path: "",
    component: MainLayoutComponent,
    children: [
      {
        path: "events",
        loadChildren: () => {
          return import("./features/events/events.module").then(
            m => m.EventsModule
          );
        }
      },
      {
        path: "",
        pathMatch: "full",
        redirectTo: "events"
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
