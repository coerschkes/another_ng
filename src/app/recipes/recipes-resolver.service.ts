import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { DataStorageService } from '../shared/data-storage.service';
import { Recipe } from './recipe.model';

export const RecipesResolverService: ResolveFn<Recipe[]> = () => {
  return inject(DataStorageService).fetchData();
};
