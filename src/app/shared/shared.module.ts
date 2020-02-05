import { NgModule } from "@angular/core";
import { CommonModule, registerLocaleData } from "@angular/common";
import { en_US, NgZorroAntdModule, NZ_I18N } from "ng-zorro-antd";
import en from "@angular/common/locales/en";
import { RouterModule } from "@angular/router";
import { UploadImageComponent } from "./components/upload-image/upload-image.component";
registerLocaleData(en);
@NgModule({
  declarations: [UploadImageComponent],
  imports: [NgZorroAntdModule, RouterModule, CommonModule],
  exports: [NgZorroAntdModule, RouterModule, UploadImageComponent],
  providers: [{ provide: NZ_I18N, useValue: en_US }]
})
export class SharedModule {}
