import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import * as firebase from "firebase/app";
import { AngularFirestore } from "@angular/fire/firestore";
import { UploadFile } from "ng-zorro-antd/upload/interface";

const IMAGE_FOLDER = "uploads";
@Injectable({
  providedIn: "root"
})
export class UploadService {
  constructor(private db: AngularFirestore) {}

  /**
   * Upload The image file into Firebase Storage
   * and return the uploaded URL
   */
  uploadImage(image: FileUpload): Observable<FileUpload> {
    console.log(image);
    const storageRef = firebase.storage().ref();
    // Generate a random image name to avoid duplication
    const imagePath = `${IMAGE_FOLDER}/${Math.floor(
      1000 + Math.random() * 9000
    )}-${image.file.name}`;

    const uploadTask: firebase.storage.UploadTask = storageRef
      .child(imagePath)
      .put(image.file);
    return new Observable(observer => {
      /**
       * Listen for events in this task
       */
      uploadTask.on(
        firebase.storage.TaskEvent.STATE_CHANGED,
        // When the upload is in progress
        (snapshot: firebase.storage.UploadTaskSnapshot) => {},
        () => observer.error(`There was an error with ${image.name}`),
        // When the upload was successful
        async () => {
          image.url = await (await uploadTask).ref.getDownloadURL();
          image.progress = false;
          observer.next(image);
          observer.complete();
        }
      );
    });
  }
}

export class FileUpload {
  key: string;
  name: string;
  url: string;
  progress: boolean;
  file: File;

  constructor(file: File) {
    this.file = file;
  }
}
