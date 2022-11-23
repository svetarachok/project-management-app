import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SearchService } from '../../services/search-service/search.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent {
  searchData: string = '';

  constructor(private router: Router, private searchService: SearchService) {}

  onSearch(): void {
    this.router.navigate(['/search-results']);
    this.searchService.startedSearch = true;
    this.searchService.search(this.searchData);
    this.searchData = '';
  }

  onEnterPressed(event: KeyboardEvent): void {
    if (event.code === 'Enter') {
      this.searchService.startedSearch = true;
      this.searchService.search(this.searchData);
      this.searchData = '';
    }
  }
}
