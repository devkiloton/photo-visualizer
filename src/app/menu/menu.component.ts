import { NgClass } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  imports:[NgClass],
  standalone: true
})
export class MenuComponent implements OnInit {

  isShown = false;

  ngOnInit(): void {
  }

  public toggle() {
    this.isShown = !this.isShown;
  }

}
