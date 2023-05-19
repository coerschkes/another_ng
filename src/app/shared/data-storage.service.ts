import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';

const firebaseBaseUrl =
  'https://udemy-angular-37826-default-rtdb.europe-west1.firebasedatabase.app/';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    private authService: AuthService
  ) {}

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http
      .put(firebaseBaseUrl + 'recipes.json', recipes)
      .subscribe((response) => {
        console.log(response);
      });
  }

  fetchData() {
    return this.http.get<Recipe[]>(firebaseBaseUrl + 'recipes.json').pipe(
      map((recipes) => {
        return recipes.map((recipe) => {
          return {
            ...recipe,
            ingredients: recipe.ingredients ? recipe.ingredients : [],
          };
        });
      }),
      tap((recipes) => {
        this.recipeService.setRecipes(recipes);
        console.log(recipes);
      })
    );
  }
}
