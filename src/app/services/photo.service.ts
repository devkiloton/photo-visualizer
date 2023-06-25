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

}
