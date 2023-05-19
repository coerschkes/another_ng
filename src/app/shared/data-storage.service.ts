import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';
import { map } from 'rxjs';

const firebaseBaseUrl =
  'https://udemy-angular-37826-default-rtdb.europe-west1.firebasedatabase.app/';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(private http: HttpClient, private recipeService: RecipeService) {}

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http
      .put(firebaseBaseUrl + 'recipes.json', recipes)
      .subscribe((response) => {
        console.log(response);
      });
  }

  fetchData() {
    return this.http
      .get<Recipe[]>(firebaseBaseUrl + 'recipes.json')
      .pipe(map((recipes) => {
        return recipes.map((recipe) => {
          return {
            ...recipe,
            ingredients: recipe.ingredients ? recipe.ingredients : [],
          };
        });
      }))
      .subscribe((response) => {
        this.recipeService.setRecipes(response);
        console.log(response);
      });
  }
}
