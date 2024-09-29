// src/app/models/theatre-plan.model.ts

import { Place } from "./Place.model";

export class TheatrePlan {
    idPlan?: number;
    totalSeats?: number;
    places?: Place[];
    isEditing: boolean = false; // Propriété pour gérer l'état d'édition
    length_S?: number;   // Longueur de chaque place
    width_S?: number;    // Largeur de chaque place
  }
  