import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Photo } from '../types/photo';
import { PhotoComponent } from '../photo/photo.component';
import { NgFor, NgIf } from '@angular/common';
import { isNil } from 'lodash';
import { CardComponent } from '../shared/components/card/card.component';
import { DarkenOnHoverDirective } from '../directives/darken-on-hover.directive'; 

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss'],
  standalone: true,
  imports:[PhotoComponent, NgFor, NgIf, CardComponent, DarkenOnHoverDirective]
})
export class PhotosComponent implements OnChanges{
@Input() photos: Photo[] = [];
rows: any[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if(!isNil(changes['photos'])){
      this.rows = this.groupColumns(this.photos);
    }
  }

  groupColumns(photos: Photo[]) {
    const newRows = [];
    for (let index = 0; index < photos.length; index+=3) {
      newRows.push(photos.slice(index, index + 3));
    }
    return newRows;
  }
}
