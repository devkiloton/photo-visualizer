import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormErrorMessageComponent } from '../form-error-message/form-error-message.component';
import { NgIf } from '@angular/common';
import { PhotoService } from '../services/photo.service';
import { Router } from '@angular/router';
import { PhotoComponent } from '../photo/photo.component';
import { ImmediateClickDirective } from '../directives/immediate-click.directive';

@Component({
  selector: 'app-photo-form',
  templateUrl: './photo-form.component.html',
  styleUrls: ['./photo-form.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, FormErrorMessageComponent, NgIf, PhotoComponent, ImmediateClickDirective],
})
export class PhotoFormComponent {

  fb = inject(NonNullableFormBuilder)
  photoService = inject(PhotoService)
  router = inject(Router)

  file:any;
  preview: string='';

  photoForm = this.fb.group({
    file: ['', Validators.required],
    description: ['', Validators.required, Validators.maxLength(300)],
    allowComments: [true]
  })

  upload(){
    const description = this.photoForm.get('description')?.value as string;
    const allowComments = this.photoForm.get('allowComments')?.value as boolean;
    this.photoService.upload(description, allowComments, this.file).subscribe(() => this.router.navigate(['']))
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
