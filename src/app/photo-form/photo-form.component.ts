import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormErrorMessageComponent } from '../form-error-message/form-error-message.component';
import { NgIf } from '@angular/common';
import { PhotoService } from '../services/photo.service';
import { Router, RouterModule } from '@angular/router';
import { PhotoComponent } from '../photo/photo.component';
import { ImmediateClickDirective } from '../directives/immediate-click.directive';
import { AlertService } from '../services/alert.service';
import { UserService } from '../services/user.service';
import { HttpEvent, HttpEventType, HttpResponse } from '@angular/common/http';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-photo-form',
  templateUrl: './photo-form.component.html',
  styleUrls: ['./photo-form.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, FormErrorMessageComponent, NgIf, PhotoComponent, ImmediateClickDirective, RouterModule],
})
export class PhotoFormComponent {

  fb = inject(NonNullableFormBuilder)
  photoService = inject(PhotoService)
  router = inject(Router)
  alertService = inject(AlertService)
  file:any;
  preview: string='';
  userservice = inject(UserService)
  percentDone = 0;

  photoForm = this.fb.group({
    file: ['', Validators.required],
    description: ['', Validators.required, Validators.maxLength(300)],
    allowComments: [true]
  })

  upload(){
    const description = this.photoForm.get('description')?.value as string;
    const allowComments = this.photoForm.get('allowComments')?.value as boolean;
    this.photoService.upload(description, allowComments, this.file)
    .pipe(finalize(()=>this.router.navigate(['/user', this.userservice.getUserName()])))
    .subscribe({
      next: (event: HttpEvent<any>) => {
        if(event.type === HttpEventType.UploadProgress){
          this.percentDone = Math.round(100 * event.loaded / event.total!)
          
        } else if (event instanceof HttpResponse){
          this.alertService.success('Upload complete', true)
        }
      },
      error: err => {
        console.log(err)
        this.alertService.danger('Upload error', true)
      }
    })
  }

  handleFile(file: File){
    this.file = file;
    // upload preview
    const reader = new FileReader();
    // async operation
    reader.onload = (event: any) => this.preview = event.target.result;
    reader.readAsDataURL(file);
  }

}
