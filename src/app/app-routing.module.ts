import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule) },
  { path: 'recipe-list', loadChildren: () => import('./pages/recipe-list/recipe-list.module').then(m => m.RecipeListPageModule) },
  { path: 'recipe-detail/:id', loadChildren: () => import('./pages/recipe-detail/recipe-detail.module').then(m => m.RecipeDetailPageModule) },
  { path: 'favorite', loadChildren: () => import('./pages/favorite/favorite.module').then(m => m.FavoritePageModule) },
  ];
  

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
