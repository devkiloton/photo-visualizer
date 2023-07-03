import { ChangeDetectionStrategy, Component, Input, OnInit, inject } from '@angular/core';
import { Observable, switchMap, tap } from 'rxjs';
import { PhotoComment } from '../types/photo-comment';
import { PhotoService } from '../services/photo.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormErrorMessageComponent } from '../form-error-message/form-error-message.component';
import { ShowIfLoggedDirective } from '../directives/show-if-logged.directive';

@Component({
  selector: 'app-photo-comments',
  templateUrl: './photo-comments.component.html',
  styleUrls: ['./photo-comments.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, FormErrorMessageComponent, ShowIfLoggedDirective],
  standalone: true
})
export class PhotoCommentsComponent implements OnInit {
  photoService = inject(PhotoService);
  fb = inject(NonNullableFormBuilder)

  @Input() photoID!: number;
  comments$!: Observable<PhotoComment[]>;
  commentForm = this.fb.group({
    commentText: ['', [Validators.required,Validators.maxLength(300)]]
  });

  ngOnInit(): void {
    this.comments$ = this.photoService.getComments(this.photoID)
  }

  public save() {
    const comment = this.commentForm.get('commentText')?.value as string;
    console.log(comment)
    this.comments$ = this.photoService
            .addComment(this.photoID, comment)
            .pipe(switchMap(() => this.photoService.getComments(this.photoID)))
            .pipe(tap(() => {
                this.commentForm.reset();
                alert('Comentário adicionado com sucesso');
      }));
  }

}
