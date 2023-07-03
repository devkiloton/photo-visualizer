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
import { AlertService } from '../services/alert.service';
import { UserService } from '../services/user.service';
import { ShowIfLoggedDirective } from '../directives/show-if-logged.directive';

@Component({
  selector: 'app-photo-detail',
  templateUrl: './photo-detail.component.html',
  styleUrls: ['./photo-detail.component.scss'],
  imports: [NgIf,AsyncPipe , PhotoComponent, PhotoCommentsComponent, PhotoOwnerOnlyDirective, ShowIfLoggedDirective],
  standalone: true,
})
export class PhotoDetailComponent implements OnInit {

  routeActivated = inject(ActivatedRoute)
  photoService = inject(PhotoService)
  router = inject(Router)
  alertService = inject(AlertService)
  userservice = inject(UserService)

  photo$!: Observable<Photo>;
  comment$!: Observable<PhotoComment[]>;
  photoID!: number;

  ngOnInit(): void {
    this.photoID= this.routeActivated.snapshot.params['photoID'] as number;
    this.photo$ = this.photoService.findById(this.photoID)
    this.comment$ = this.photoService.getComments(this.photoID)
    this.photo$.subscribe({ error: err => {
      console.log(err)
      this.router.navigate(['not-found'])
    }})
  }

  public remove(){
    this.photoService.removePhoto(this.photoID).subscribe({
      next: () => {
      this.alertService.success('Photo removed', true)
      this.router.navigate(['/user', this.userservice.getUserName()])
    },
      error: err => {
        console.log(err)
        this.alertService.danger('Could not delete the photo', true)
      }
    })
  }

  public like(photo: Photo){
    this.photoService.like(photo.id).subscribe(liked => {
      if(liked){
        this.photo$ = this.photoService.findById(photo.id)
      }
    })
  }

}
