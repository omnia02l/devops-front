import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private http: HttpClient) { }

  uploadImage(image: File) {
    const formData = new FormData();
    formData.append('image', image);

    return this.http.post<any>('http://localhost:8085/api/images/upload', formData);
  }
}
