export class GenderstatDTO {
  totalMaleDancers: number;
  totalFemaleDancers: number;

  constructor(totalMaleDancers: number, totalFemaleDancers: number) {
    this.totalMaleDancers = totalMaleDancers;
    this.totalFemaleDancers = totalFemaleDancers;
  }
}
