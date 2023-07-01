import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Photo } from '../types/photo';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  http = inject(HttpClient)

  public listUserPhotos = (userId: string) => this.http.get<Photo[]>(`http://localhost:3000/${userId}/photos`)
  public listUserPhotosPaginated = (userId: string, page: number) => this.http.get<Photo[]>(`http://localhost:3000/${userId}/photos`, { params: new HttpParams().append('page', page.toString()) })
  public upload = (description: string, allowComments: boolean, file: File) => {
    // When we have a file to upload, we need to use FormData to send it to the server.
    const formData = new FormData();
    formData.append('description', description);
    formData.append('allowComments', allowComments ? 'true' : 'false');
    formData.append('imageFile', file);
    return this.http.post('http://localhost:3000/photos/upload', formData, { observe: 'events', reportProgress: true })
  }

}
