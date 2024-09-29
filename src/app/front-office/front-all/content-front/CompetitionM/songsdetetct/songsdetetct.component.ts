import { Component } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { SongdetectionService } from 'src/app/core/services/songdetection.service';

@Component({
  selector: 'app-songsdetetct',
  templateUrl: './songsdetetct.component.html',
  styleUrls: ['./songsdetetct.component.css']
})
export class SongsdetetctComponent {

  constructor(private songDetectionService: SongdetectionService,
    private http: HttpClient)  { }

  startRecording() {
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
        const mediaRecorder = new MediaRecorder(stream);
        let chunks: any[] = [];

        mediaRecorder.ondataavailable = (e) => {
          chunks.push(e.data);
        };

        mediaRecorder.onstop = () => {
          const blob = new Blob(chunks, { type: 'audio/wav' });
          this.sendAudioData(blob);
        };

        mediaRecorder.start();
        setTimeout(() => {
          mediaRecorder.stop();
        }, 5000); // 5 seconds recording
      })
      .catch(err => console.error('Error capturing audio: ', err));
  }

  sendAudioData(audioData: Blob) {
    this.songDetectionService.detectSong(audioData).then(
      (response: any) => {
        if (response && response.matches && response.matches.length > 0) {
          console.log('Songs detected:', response.matches);
          // Traitez les correspondances ici
        } else {
          console.log('No songs detected.');
        }
      },
      (error) => {
        console.error('Error detecting song: ', error);
        // Handle error here
      }
    );
  }
//////////////////////////////////////////////////////////////////

term: string = '';
  suggestions: any[] = [];


  autoComplete() {
    this.http.get<any>(`http://localhost:8085/autosong/auto-complete?term=${this.term}`)
      .subscribe(
        response => {
          this.suggestions = response.hints;
        },
        error => {
          console.error('Error fetching auto-complete suggestions:', error);
        }
      );
  }
}






