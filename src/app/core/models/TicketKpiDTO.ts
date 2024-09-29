export interface TicketKpiDTO {
  competitionId: number;
  venueId: number;
    competitionName: string;
    venueName: string;
    totalTicketsSold: number;
    totalRevenue: number;
    occupancyRate: number;
    occupiedSeats:number;
    totalSeats:number;
    interpretation?: string;
  }