import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FavoriteService } from '../services/favorite.service';
import { HttpClient } from '@angular/common/http';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.page.html',
  styleUrls: ['./recipe-detail.page.scss'],
})
export class RecipeDetailPage implements OnInit {
  recipe: any;
  isFavorite: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private favoriteService: FavoriteService,
    private http: HttpClient,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      this.fetchRecipeDetail(id);
      this.isFavorite = this.favoriteService.isFavorite(id);
    });
  }

  fetchRecipeDetail(id: number) {
    const apiUrl = `https://api.spoonacular.com/recipes/${id}/information`;
    const apiKey = 'e296270d16e545e381ca8d8176f5a8a4';
    const params = { apiKey: apiKey };

    this.http.get<any>(apiUrl, { params }).subscribe(
      (data) => {
        this.recipe = data;
      },
      (error) => {
        console.error('Error fetching recipe details: ', error);
      }
    );
  }

  async toggleFavorite() {
    if (this.isFavorite) {
      this.favoriteService.removeFavorite(this.recipe.id);
      this.presentToast('Recipe removed');
    } else {
      this.favoriteService.addFavorite(this.recipe);
      this.presentToast('Recipe saved');
    }
    this.isFavorite = !this.isFavorite;
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000, 
      position: 'bottom'
    });
    toast.present();
  }
}
