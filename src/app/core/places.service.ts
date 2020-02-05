import { Injectable } from "@angular/core";
import { OpenStreetMapProvider } from "leaflet-geosearch";
import { from } from "rxjs";
import { debounceTime, distinctUntilChanged, map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class PlacesService {
  constructor() {}

  getPlaceAutocomplete(query: string) {
    const provider = new OpenStreetMapProvider();

    return from(provider.search({ query })).pipe(
      map(places => places.map(item => item.label))
    );
  }
}
