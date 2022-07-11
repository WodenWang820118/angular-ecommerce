import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  searchText: string = '';

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  doSearch(searchText: string) {
    if (!searchText) return;
    this.router.navigateByUrl(`/search/${searchText}`);
  }
}
