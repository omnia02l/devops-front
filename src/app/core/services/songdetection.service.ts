import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SongdetectionService {

  constructor(private http: HttpClient) { }

  detectSong(audioData: Blob) {
    const reader = new FileReader();
    reader.readAsArrayBuffer(audioData);
    return new Promise((resolve, reject) => {
      reader.onload = () => {
        const audioBytes = reader.result as ArrayBuffer;
        const uint8Array = new Uint8Array(audioBytes);
        const array = Array.from(uint8Array);
        const base64Audio = btoa(array.map(n => n.toString()).join(''));
        console.log('Base64 audio:', base64Audio); // Ajout d'un log ici
        this.http.post<string>('http://localhost:8085/songdetection/detect-song', base64Audio)
          .subscribe(
            (response: any) => {
              console.log('Response from server:', response); // Ajout d'un log ici
              resolve(response);
            },
            (error) => {
              console.error('Error from server:', error); // Ajout d'un log ici
              reject(error);
            }
          );
      };
      reader.onerror = (error) => {
        console.error('File reader error:', error); // Ajout d'un log ici
        reject(error);
      };
    });
  }
}
