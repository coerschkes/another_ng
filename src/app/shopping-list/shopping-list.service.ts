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
  startedEditing = new Subject<number>();

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

  getIngredient(index: number) {
    return this.ingredients[index];
  }

  updateIngredient(index: number, ingredient: Ingredient) {
    this.ingredients[index] = ingredient;
    this.onUpdate.next();
  }

  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.onUpdate.next();
  }
}
