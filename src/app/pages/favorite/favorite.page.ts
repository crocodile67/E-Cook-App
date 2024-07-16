import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { FavoriteService } from '../services/favorite.service';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.page.html',
  styleUrls: ['./favorite.page.scss'],
})
export class FavoritePage implements OnInit {
  favoriteRecipes: any[] = [];

  constructor(
    private navCtrl: NavController,
    private favoriteService: FavoriteService
  ) { }
  ngOnInit() {
    this.loadFavoriteRecipes();
  }
  loadFavoriteRecipes() {
    this.favoriteRecipes = this.favoriteService.getFavoriteRecipes();
  }
  viewRecipe(recipeId: number) {
    this.navCtrl.navigateForward(['/recipe-detail', recipeId]);
  }
}
