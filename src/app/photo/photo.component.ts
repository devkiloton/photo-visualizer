import { ChangeDetectionStrategy, Component, Input } from '@angular/core';


const CLOUD = 'http://localhost:3000/imgs/';
@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PhotoComponent {
  _url = '';
  @Input() description = ""
  @Input() set url(string: string) {
    if (string.startsWith('data')) {
      this._url = string;
    } else {
      this._url = CLOUD + string;
    }
  }

  get url() {
    return this._url;
  }

}
