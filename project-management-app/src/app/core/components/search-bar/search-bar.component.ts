import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SearchService } from '../../services/search-service/search.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent implements OnInit {
  searchData: string = '';

  constructor(private router: Router, private searchService: SearchService) {}

  ngOnInit(): void {
  }

  onSearch() {
    this.router.navigate(['/search-results']);
    this.searchService.startedSearch = true;
    this.searchService.search(this.searchData);
  }

  onKeyupAtSearch(event: Event) {
    // console.log(event);
  }
}
