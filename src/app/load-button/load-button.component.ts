import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-load-button',
  templateUrl: './load-button.component.html',
  styleUrls: ['./load-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIf],
  standalone: true,
})
export class LoadButtonComponent implements OnInit {

  @Input() hasMore: boolean = false;

  ngOnInit(): void {
  }

}
