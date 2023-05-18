import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css'],
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  editForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
    });
  }

  onSubmit() {
    if (this.editMode) {
      this.updateRecipe();
    } else {
      this.addRecipe();
    }
    this.resetForm();
  }

  resetForm() {
    this.editForm.reset();
    this.editMode = false;
  }

  get controls() {
    return (this.editForm.get('ingredients') as FormArray).controls;
  }

  //*ngFor="let ingredientCtrl of controls; let i = index"

  private initForm() {
    const editRecipe = this.recipeService.getRecipe(this.id);
    let name = '';
    let imagePath = '';
    let description = '';
    let ingredients = new FormArray([]);

    if (this.editMode) {
      name = editRecipe.name;
      imagePath = editRecipe.imagePath;
      description = editRecipe.description;
      if (editRecipe['ingredients']) {
        for (let ingredient of editRecipe.ingredients) {
          ingredients.push(
            new FormGroup({
              name: new FormControl(ingredient.name, Validators.required),
              amount: new FormControl(ingredient.amount, [
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/),
              ]),
            })
          );
        }
      }
    }

    this.editForm = new FormGroup({
      name: new FormControl(name, Validators.required),
      imagePath: new FormControl(imagePath, Validators.required),
      description: new FormControl(description, Validators.required),
      ingredients: new FormArray(ingredients.controls),
    });
  }

  private addRecipe() {
    const nextId = this.recipeService.getRecipes().length + 1;
    this.recipeService.addRecipe(
      new Recipe(
        nextId,
        this.editForm.value.name,
        this.editForm.value.description,
        this.editForm.value.imagePath,
        []
      )
    );
  }

  private updateRecipe() {
    this.recipeService.updateRecipe(
      new Recipe(
        this.id,
        this.editForm.value.name,
        this.editForm.value.description,
        this.editForm.value.imagePath,
        []
      )
    );
  }
}
