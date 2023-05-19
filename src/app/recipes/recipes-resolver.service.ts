import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { DataStorageService } from '../shared/data-storage.service';
import { Recipe } from './recipe.model';
import { RecipeService } from './recipe.service';

export const RecipesResolverService: ResolveFn<Recipe[]> = () => {
  const recipes = inject(RecipeService).getRecipes();
  if (recipes.length > 0) {
    return recipes;
  }
  return inject(DataStorageService).fetchData();
};
