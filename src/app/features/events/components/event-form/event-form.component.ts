import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from "@angular/core";
import EventDetails from "@core/events/entities/event-details";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CategoryService } from "@core/category.service";
import { PlacesService } from "@core/places.service";
import { Observable } from "rxjs";

@Component({
  selector: "app-event-form",
  templateUrl: "./event-form.component.html",
  styleUrls: ["./event-form.component.scss"]
})
export class EventFormComponent implements OnInit, OnChanges {
  @Input() event: EventDetails = new EventDetails();
  @Output() submitForm: EventEmitter<EventDetails> = new EventEmitter<
    EventDetails
  >();
  @ViewChild("addressInput") addressInput: any;
  eventForm: FormGroup;
  categories$: Observable<string[]>;
  places$: Observable<string[]>;

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private placesService: PlacesService
  ) {}

  buildForm(event: EventDetails = new EventDetails()) {
    this.eventForm = this.fb.group({
      title: [event.title, [Validators.required]],
      description: [event.description, [Validators.required]],
      category: [event.category, [Validators.required]],
      coverImage: [event.coverImage, [Validators.required]],
      featured: [event.featured, [Validators.required]],
      price: [event.price, [Validators.required]],
      host: [event.host, [Validators.required]],
      address: [event.address, [Validators.required]],
      period: this.fb.group({
        startDate: [event.period.startDate.toString(), [Validators.required]],
        endDate: [event.period.endDate.toString(), [Validators.required]]
      })
    });
  }

  ngOnInit(): void {
    this.buildForm();
    this.categories$ = this.categoryService.getCategories();
  }

  ngOnChanges(changes: SimpleChanges) {
    const { event } = changes;
    if (event.currentValue) {
      /**
       * Postpone the function call of buildForm() to the last of queue,
       * to make sure onInit is called first
       */
      setTimeout(() => this.buildForm(event.currentValue), 0);
    }
  }

  onSaveImage(coverImage) {
    this.eventForm.patchValue({ coverImage });
  }

  onStartDate = (startDate: Date) => {
    this.eventForm.controls["period"].patchValue({
      startDate: startDate.toString()
    });
  };
  onEndDate = (endDate: Date) =>
    this.eventForm.controls["period"].patchValue({
      endDate: endDate.toString()
    });

  onPlacesSearch(value) {
    this.places$ = this.placesService.getPlaceAutocomplete(value);
  }

  onSubmitForm(): void {
    this.submitForm.emit(this.eventForm.value);
  }
}
