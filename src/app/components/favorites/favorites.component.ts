import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css'],
})
export class FavoritesComponent implements OnInit {
  favorites = [];
  constructor(private router: Router) {}

  ngOnInit() {
    this.favorites = JSON.parse(localStorage.getItem('favorite'));
  }

  getFavDetail(id: string) {
    console.log('favId', id);
    this.router.navigate(['weather/', id]);
  }

  fahrenToCelsus(tem): Number {
    return Math.round((tem - 32) / 1.8);
  }
}
