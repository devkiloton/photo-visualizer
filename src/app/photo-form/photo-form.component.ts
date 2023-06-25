import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-photo-form',
  templateUrl: './photo-form.component.html',
  styleUrls: ['./photo-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PhotoFormComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
