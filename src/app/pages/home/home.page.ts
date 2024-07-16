import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  searchQuery: string = ''; // Define searchQuery property
  recipes: any[] = []; // Define recipes array
  featuredRecipe: any; // Define featuredRecipe property
  isLoading: boolean = false; // Define isLoading property

  constructor(private http: HttpClient, private router: Router) {}

  ionViewDidEnter() {
    this.fetchFeaturedRecipe();
  }

  fetchFeaturedRecipe() {
    const apiUrl = 'https://api.spoonacular.com/recipes/random';
    const apiKey = 'e296270d16e545e381ca8d8176f5a8a4';
    const params = {
      apiKey: apiKey,
      number: '5', 
    };

    this.http.get<any>(apiUrl, { params }).subscribe(
      (data) => {
        this.featuredRecipe = data.recipes[0];
      },
      (error) => {
        console.error('Error fetching featured recipe: ', error);
      }
    );
  }

  searchRecipes() {
    if (this.searchQuery.trim() !== '') {
      const apiUrl = 'https://api.spoonacular.com/recipes/complexSearch';
      const apiKey = 'e296270d16e545e381ca8d8176f5a8a4';
      const params = {
        apiKey: apiKey,
        query: this.searchQuery,
        number: '10',
      };

      this.isLoading = true;
      this.http.get<any>(apiUrl, { params }).subscribe(
        (data) => {
          this.recipes = data.results;
          this.isLoading = false;
        },
        (error) => {
          console.error('Error fetching recipes: ', error);
          this.isLoading = false;
        }
      );
    } else {
      this.recipes = [];
      this.fetchFeaturedRecipe();
    }
  }

  
  navigateToCategory(category: string) {
    console.log('Navigating to category: ', category);
  }

  viewRecipe(recipe: any) {
    this.router.navigate(['/recipe-detail', recipe.id]); 
  }
}
