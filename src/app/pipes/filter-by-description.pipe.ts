import { Pipe, PipeTransform } from '@angular/core';
import { Photo } from '../types/photo';

@Pipe({
  name: 'filterByDescription',
  standalone: true
})
export class FilterByDescriptionPipe implements PipeTransform {

  transform(photos: Photo[], descriptionQuery: string): Photo[] {
    descriptionQuery = descriptionQuery.trim().toLowerCase();
    if(descriptionQuery)
    {
      return photos.filter(photo => photo.description.toLowerCase().includes(descriptionQuery));
    }else{
      return photos;
    }
  }

}
