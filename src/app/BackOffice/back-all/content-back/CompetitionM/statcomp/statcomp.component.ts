import { CompetitionService } from 'src/app/core/services/competition.service';
import { Component, OnInit } from '@angular/core';

import { Chart } from 'chart.js';

@Component({
  selector: 'app-statcomp',
  templateUrl: './statcomp.component.html',
  styleUrls: ['./statcomp.component.css']
})
export class StatcompComponent implements OnInit {

  danceStyleChart: any;
  participantsChart: any;

  constructor(private competitionService: CompetitionService) { }

  ngOnInit(): void {
    this.loadCompetitionCountByDanceStyle();
    this.loadNumberOfParticipantsPerCompetition();
  }

  loadCompetitionCountByDanceStyle(): void {
    this.competitionService.getCompetitionCountByDanceStyle().subscribe(data => {
      const styles = Object.keys(data);
      const counts = Object.values(data);

      this.danceStyleChart = new Chart('danceStyleChart', {
        type: 'bar',
        data: {
          labels: styles,
          datasets: [{
            label: 'Number of Competitions in each Dancestyle ',
            data: counts,
            backgroundColor: '#660019',
            borderColor: '#8B0026',
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                stepSize: 1  // échelle de pas de 1
              }
            }
          },
          plugins: {
            title: {
              display: true,
              text: 'Number of Competitions by Dancestyle',
              font: {
                size: 16,
                family: 'Arial', // Police de caractères
                weight: 'bold' // Gras
              },
              color: '#001F3F' // Couleur du titre
            },
            legend: {
              display: false
            }
          },
          layout: {
            padding: {
              left: 20,
              right: 20,
              top: 20,
              bottom: 20
            }
          },
          indexAxis: 'y',
        }
      });
    });
  }


  loadNumberOfParticipantsPerCompetition(): void {
    this.competitionService.getNumberOfParticipantsPerCompetition().subscribe(data => {
      const compNames = Object.keys(data);
      const totalParticipants = Object.values(data);

      this.participantsChart = new Chart('participantsChart', {
        type: 'line',
        data: {
          labels: compNames,
          datasets: [{
            label: 'Total Participants in each competition',
            data: totalParticipants,
            fill: false,
            borderColor: '#A8043C',
            borderWidth: 3,
            pointBackgroundColor: '#8B0026',
            pointBorderColor: '#8B0026'
          }]
        },
        options: {
          plugins: {
            title: {
              display: true,
              text: 'Total Participants by Competition',
              font: {
                size: 16,
                family: 'Arial', // Police de caractères
                weight: 'bold' // Gras
              },
              color: '#001F3F' // Couleur du titre

            }
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                stepSize: 1  // échelle de pas de 1
              }
            },
            x: {
              ticks: {
                autoSkip: false,
                maxRotation: 90,
                minRotation: 50
              }
            }
          }
        }
      });
    });
  }
}
