import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Task } from 'src/app/boards/models/task.interface';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss'],
})
export class SearchResultComponent {
  @Input() result!: Task;

  constructor(private router: Router) {}

  navigateToBoard() {
    this.router.navigate(['/board', this.result.boardId]);
  }
}
