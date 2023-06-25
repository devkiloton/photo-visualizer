import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-error-message',
  templateUrl: './form-error-message.component.html',
  styleUrls: ['./form-error-message.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormErrorMessageComponent {

  @Input() text!: string;

}
