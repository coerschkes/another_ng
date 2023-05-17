import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';

@Injectable({ providedIn: 'root' })
export class ShoppingListService {
  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ];
  onUpdate = new Subject<void>();

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.onUpdate.next();
  }

  addIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
    this.onUpdate.next();
  }

  getIngredients() {
    return this.ingredients.slice();
  }
}
