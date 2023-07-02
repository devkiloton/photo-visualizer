import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PhotoService } from '../services/photo.service';
import { Photo } from '../types/photo';
import { PhotoComponent } from '../photo/photo.component';
import { Observable } from 'rxjs';
import { AsyncPipe, NgIf } from '@angular/common';
import { PhotoComment } from '../types/photo-comment';
import { PhotoCommentsComponent } from '../photo-comments/photo-comments.component';
import { PhotoOwnerOnlyDirective } from '../directives/photo-owner-only.directive';

@Component({
  selector: 'app-photo-detail',
  templateUrl: './photo-detail.component.html',
  styleUrls: ['./photo-detail.component.scss'],
  imports: [NgIf,AsyncPipe , PhotoComponent, PhotoCommentsComponent, PhotoOwnerOnlyDirective],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PhotoDetailComponent implements OnInit {

  routeActivated = inject(ActivatedRoute)
  photoService = inject(PhotoService)
  router = inject(Router)

  photo$!: Observable<Photo>;
  comment$!: Observable<PhotoComment[]>;
  photoID!: number;

  ngOnInit(): void {
    this.photoID= this.routeActivated.snapshot.params['photoID'] as number;
    this.photo$ = this.photoService.findById(this.photoID)
    this.comment$ = this.photoService.getComments(this.photoID)
  }

  public remove(){
    this.photoService.removePhoto(this.photoID).subscribe(() => {
      this.router.navigate([''])
    })
  }

}
