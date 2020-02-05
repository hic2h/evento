export default class EventPeriod {
  constructor(
    public startDate: string | Date = new Date().toString(),
    public endDate: string | Date = new Date().toString()
  ) {}
}
