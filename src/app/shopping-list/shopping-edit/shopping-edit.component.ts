import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  addForm: FormGroup;
  editSubscription: Subscription;
  editMode = false;
  editedItemIndex: number;

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnDestroy(): void {
    this.editSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.addForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      amount: new FormControl(null, [Validators.required, Validators.min(1)]),
    });
    this.editSubscription = this.shoppingListService.startedEditing.subscribe(
      (index: number) => {
        this.editMode = true;
        this.editedItemIndex = index;
        const ingredient = this.shoppingListService.getIngredient(index);
        this.addForm.setValue({
          name: ingredient.name,
          amount: ingredient.amount,
        });
      }
    );
  }

  onSubmit() {
    console.log(this.addForm);
    if (this.editMode) {
      this.shoppingListService.updateIngredient(
        this.editedItemIndex,
        new Ingredient(this.addForm.value.name, this.addForm.value.amount)
      );
    } else {
      this.shoppingListService.addIngredient(
        new Ingredient(this.addForm.value.name, this.addForm.value.amount)
      );
    }
    this.resetForm();
  }

  resetForm() {
    this.addForm.reset();
    this.editMode = false;
  }

  onDelete() {
    this.shoppingListService.deleteIngredient(this.editedItemIndex);
    this.resetForm();
  }
}
