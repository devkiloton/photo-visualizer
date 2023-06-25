import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PhotoComponent {
  @Input() description = ""
  @Input() url = ""

}
