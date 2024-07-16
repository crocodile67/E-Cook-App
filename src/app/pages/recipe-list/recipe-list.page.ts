import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.page.html',
  styleUrls: ['./recipe-list.page.scss'],
})
export class RecipeListPage implements OnInit {
  query: string = '';
  recipes: any[] = [];

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.fetchInitialRecipes();
  }

  fetchInitialRecipes() {
    const apiUrl = 'https://api.spoonacular.com/recipes/random';
    const apiKey = 'e296270d16e545e381ca8d8176f5a8a4';
    const params = {
      apiKey: apiKey,
      number: '10',
    };

    this.http.get<any>(apiUrl, { params }).subscribe(
      (data) => {
        this.recipes = data.recipes;
      },
      (error) => {
        console.error('Error fetching initial recipes: ', error);
      }
    );
  }

  searchRecipes() {
    if (this.query.trim() !== '') {
      const apiUrl = 'https://api.spoonacular.com/recipes/complexSearch';
      const apiKey = 'e296270d16e545e381ca8d8176f5a8a4';
      const params = {
        apiKey: apiKey,
        query: this.query,
        number: '8',
      };

      this.http.get<any>(apiUrl, { params }).subscribe(
        (data) => {
          this.recipes = data.results;
        },
        (error) => {
          console.error('Error fetching recipes: ', error);
        }
      );
    } else {
      this.fetchInitialRecipes();
    }
  }

  viewRecipe(id: number) {
    this.router.navigate(['/recipe-detail', id]);
  }

  getShortDescription(description: string): string {
    const maxLength = 10;
    if (description.length > maxLength) {
      return description.substring(0, maxLength) + '...';
    }
    return description;
  }
}
