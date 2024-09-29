import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Competition } from 'src/app/core/models/Competition';
import { CompetitionService } from 'src/app/core/services/competition.service';
import { GenderstatDTO } from 'src/app/core/models/GenderstatDTO';
import { Chart, ArcElement, Tooltip, Legend, registerables } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';



@Component({
  selector: 'app-competition-details',
  templateUrl: './competition-details.component.html',
  styleUrls: ['./competition-details.component.css']
})
export class CompetitionDetailsComponent implements OnInit {
  competitionId!: number;
  competition!: Competition;
  genderStats!: GenderstatDTO;
  chart: any;

  constructor(private route: ActivatedRoute, private competitionService: CompetitionService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.competitionId = +params['id'];
      this.loadCompetitionDetails(this.competitionId);
    });

    // Appel du service pour récupérer les statistiques de genre
    this.competitionService.GenderStatsForCompetition(this.competitionId).subscribe(
      genderStats => {
        // Utilisation des données récupérées pour créer la chart
        this.createGenderStatsChart(genderStats);
      },
      error => {
        console.log('Error fetching gender statistics:', error);
      }
    );
  }

  loadCompetitionDetails(competitionId: number) {
    this.competitionService.getCompetitionById(competitionId).subscribe(
      competition => {
        this.competition = competition;
      },
      error => {
        console.log('Error fetching competition details:', error);
      }
    );
  }

  createGenderStatsChart(genderStats: GenderstatDTO): void {
    const labels = ['Male', 'Female'];
    const counts = [genderStats.totalMaleDancers, genderStats.totalFemaleDancers];

    const maleColor = '#001F3F'; // Utilisez la couleur de votre palette pour les hommes
    const femaleColor = '#A8043C'; // Utilisez la couleur de votre palette pour les femmes

    const chart = new Chart('genderStatsCanvas', {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Gender Stats',
          data: counts,
          backgroundColor: [
            maleColor,
            femaleColor
          ],
          borderColor: [
            maleColor,
            femaleColor
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        },
        plugins: {
          legend: {
            display: false,
          },
          datalabels: {
            color: '#ffffff',
            formatter: (value, ctx) => {
              return value;
            },
            anchor: 'end',
            align: 'start',
            offset: 10,
          }
        }
      }
    });
  }}
