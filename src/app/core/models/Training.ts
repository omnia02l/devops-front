export interface Training {
  id?: number
  trainingName?: string
  description?: string
  start?: Date
  end?: Date
  color?: string
  capacity?: number
  danceHallName?: string
  coachName?: string
  trainingCategory?:string
}

export interface TrainingResponse {
  id?:number
  trainingName?: string
  trainingDescription?: string
  start?: Date
  end?: Date
  capacity?: number
  danceHallName?: string
  danceHallAddress?: string
  coachName?: string
  trainingParticipantList?:TrainingParticipant[];
}

export interface UpdateTrainingDatesRequest {
  id?: number
  start?: Date
  end?: Date
}

export interface TrainingParticipant {
  id?: number
  participantName?: string
  phoneNumber?: string
  trainingId?: number
}

export interface UpdateTrainingRequest{
  name?:string
  description?:string
  coachName?:string
}
