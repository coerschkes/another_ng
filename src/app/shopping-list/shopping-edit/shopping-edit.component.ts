import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit {
  addForm: FormGroup;

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit(): void {
    this.addForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      amount: new FormControl(null, Validators.required),
    });
  }

  onAddItem() {
    console.log(this.addForm);
    this.shoppingListService.addIngredient(
      new Ingredient(this.addForm.value.name, this.addForm.value.amount)
    );
  }
}
