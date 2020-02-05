import { NgModule } from "@angular/core";
import { MainLayoutComponent } from "./layout/main-layout/main-layout.component";
import { AppComponent } from "./root/app.component";
import { SharedModule } from "../shared/shared.module";

@NgModule({
  declarations: [AppComponent, MainLayoutComponent],
  imports: [SharedModule],
  exports: []
})
export class BlocksModule {}
