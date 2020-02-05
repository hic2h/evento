import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { UploadFile, UploadXHRArgs } from "ng-zorro-antd";
import { FileUpload, UploadService } from "@core/upload.service";

@Component({
  selector: "app-upload-image",
  templateUrl: "./upload-image.component.html",
  styleUrls: ["./upload-image.component.scss"]
})
export class UploadImageComponent implements OnInit {
  @Input() image: string;
  @Output() saveImage: EventEmitter<string> = new EventEmitter<string>();
  constructor(private uploadService: UploadService) {}

  ngOnInit(): void {}

  setMediaUploadHeaders = (file: UploadFile) => {
    return {
      "Content-Type": "multipart/form-data",
      Accept: "application/json"
    };
  };

  uploadImageReq = (item: UploadXHRArgs) => {
    const currentFileUpload = new FileUpload(item.file as any);
    this.uploadService.uploadImage(currentFileUpload).subscribe(
      (uploadedImage: FileUpload) => {
        item.onSuccess(uploadedImage, item.file, item);
        this.setAndEmitImage(uploadedImage.url);
      },
      err => item.onError(err, item.file)
    );
  };

  deleteImage() {
    this.setAndEmitImage(null);
  }

  setAndEmitImage = (imageUrl: string) => {
    this.image = imageUrl;
    this.saveImage.emit(this.image);
  };
}
