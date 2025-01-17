import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { RecipeDetailPage } from './recipe-detail.page';

const routes: Routes = [
  {
    path: '',
    component: RecipeDetailPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [RecipeDetailPage]
})
export class RecipeDetailPageModule {}
