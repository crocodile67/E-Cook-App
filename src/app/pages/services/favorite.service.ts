import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  private favoriteRecipes: any[] = [];

  constructor() { }

  addFavorite(recipe: any) {
    if (!this.isFavorite(recipe.id)) {
      this.favoriteRecipes.push(recipe);
    }
  }

  removeFavorite(recipeId: number) {
    this.favoriteRecipes = this.favoriteRecipes.filter(recipe => recipe.id !== recipeId);
  }

  getFavoriteRecipes() {
    return this.favoriteRecipes;
  }

  isFavorite(recipeId: number): boolean {
    return this.favoriteRecipes.some(recipe => recipe.id === recipeId);
  }
}
