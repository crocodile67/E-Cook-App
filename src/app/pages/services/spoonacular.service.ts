import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpoonacularService {
  private apiKey = 'e296270d16e545e381ca8d8176f5a8a4';
  private apiUrl = 'https://api.spoonacular.com/recipes';

  constructor(private http: HttpClient) { }

  searchRecipes(query: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/complexSearch`, {
      params: {
        query: query,
        apiKey: this.apiKey
      }
    });
  }

  getRecipeDetails(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}/information`, {
      params: {
        apiKey: this.apiKey
      }
    });
  }
}
