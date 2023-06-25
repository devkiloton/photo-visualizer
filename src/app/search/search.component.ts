import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject, debounceTime } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchComponent implements OnInit, OnDestroy {
  @Output() onTyping = new EventEmitter<string>();
  @Input() value = '';

  debounce = new Subject<string>();


  ngOnInit(): void {
    this.debounce.pipe(debounceTime(300)).subscribe(filter => this.onTyping.emit(filter));

  }

  ngOnDestroy(): void {
    this.debounce.unsubscribe();
}

}
