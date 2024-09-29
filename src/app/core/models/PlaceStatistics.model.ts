import { Place } from "./Place.model";

export interface PlaceStatistics {
    neverBooked: Place[];
    bookedOnce: Place[];
    bookedMoreThanOnce: Place[];
  }