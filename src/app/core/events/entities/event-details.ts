import EventLocation from "./event-location";
import EventPeriod from "./event-period";

export default class EventDetails {
  id?: string;
  title: string;
  category: string;
  description: string;
  coverImage: string;
  featured = false;
  price = 0; // Zero for free events
  address: string;
  host: string;
  period: EventPeriod = new EventPeriod();
}
