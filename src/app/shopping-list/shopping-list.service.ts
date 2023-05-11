import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

@Injectable({ providedIn: 'root' })
export class ShoppingListService {
  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ];
  onUpdate = new EventEmitter<void>();

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.onUpdate.emit();
  }

  getIngredients() {
    return this.ingredients.slice();
  }
}
