import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ImageStore } from '../models/ImageStore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageStoreService {

  imageURL = 'http://localhost:8085/cloudinary/';

  constructor(private httpClient: HttpClient) { }

  public list(): Observable<ImageStore[]> {
    return this.httpClient.get<ImageStore[]>(this.imageURL + 'list');
  }

  public upload(image: File, id:any) {
    const formData = new FormData();
    formData.append('multipartFile', image);
    return this.httpClient.post<any>(this.imageURL + 'upload/'+id, formData);
  }

  public delete(id: any): Observable<any> {
    return this.httpClient.delete<any>(this.imageURL + `delete/${id}`);
  }

}
