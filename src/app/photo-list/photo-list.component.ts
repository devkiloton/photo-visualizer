import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { PhotoService } from '../services/photo.service';
import { Photo } from '../types/photo';
import { ActivatedRoute } from '@angular/router';
import { PhotosComponent } from '../photos/photos.component';
import { FilterByDescriptionPipe } from '../pipes/filter-by-description.pipe';
import { Subject, debounceTime } from 'rxjs';
import { LoadButtonComponent } from '../load-button/load-button.component';
import { SearchComponent } from '../search/search.component';

@Component({
  selector: 'app-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.scss'],
  standalone: true,
  imports:[PhotosComponent, FilterByDescriptionPipe, LoadButtonComponent, SearchComponent],
})
export class PhotoListComponent implements OnInit {
  activatedRoute = inject(ActivatedRoute)
  photoService = inject(PhotoService)
  filter: string = '';
  photos!: Photo[];
  hasMore = true
  pageNumber = 1;
  userName = '';

  public ngOnInit(): void {
    this.userName = this.activatedRoute.snapshot.params['userName'];
    // Taking the data from the resolver and passing it to the component
    this.photos = this.activatedRoute.snapshot.data['photos'];
  }



  load(){
    this.photoService.listUserPhotosPaginated(this.userName, ++this.pageNumber).subscribe(photos => {
      this.filter = '';
      this.photos = this.photos.concat(photos);
      if(!photos.length) this.hasMore = false;
    });
  }
}
