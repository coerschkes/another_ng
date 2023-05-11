import { Component, ElementRef, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent {
  @ViewChild('nameInput') ingredientName: ElementRef;
  @ViewChild('amountInput') ingredientAmount: ElementRef;

  constructor(private shoppingListService: ShoppingListService) {}

  onAddItem() {
    console.log(this.ingredientName, this.ingredientAmount);
    this.shoppingListService.addIngredient(
      new Ingredient(
        this.ingredientName.nativeElement.value,
        this.ingredientAmount.nativeElement.valueAsNumber
      )
    );
  }
}
