export interface Reward {
  idreward?: number;
  dateofreward?: Date;
  descreption?: string;
  rewardcateg?: Rewardcategory;
}

export enum Rewardcategory {
  BestCostume,
  BestChoreography,
  YoungTalentAward
}
