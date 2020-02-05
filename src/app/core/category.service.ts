import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class CategoryService {
  constructor() {}

  getCategories(): Observable<string[]> {
    return of([
      "Concerts",
      "Conferences",
      "Comedy",
      "Dance",
      "Film",
      "Food",
      "Galleries",
      "Health",
      "Holiday",
      "Networking",
      "On Campus",
      "Organizations",
      "Outdoors",
      "Science",
      "Technology",
      "Other"
    ]);
  }
}
