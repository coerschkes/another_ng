import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
    private recipeService: RecipeService,
    private router: Router
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
      this.recipeService.updateRecipe(this.id, this.editForm.value);
    } else {
      this.recipeService.addRecipe(this.editForm.value);
    }
    this.resetForm();
  }

  resetForm() {
    this.editForm.reset();
    this.editMode = false;
    this.navigateBack();
  }

  get controls() {
    return (this.editForm.get('ingredients') as FormArray).controls;
  }

  onAddIngredient() {
    (this.editForm.get('ingredients') as FormArray).push(
      this.createIngredientsFormGroup(null, null)
    );
  }

  navigateBack() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  private initForm() {
    const initData = this.getInitData();

    this.editForm = new FormGroup({
      name: new FormControl(initData.name, Validators.required),
      imagePath: new FormControl(initData.imagePath, Validators.required),
      description: new FormControl(initData.description, Validators.required),
      ingredients: new FormArray(initData.ingredients.controls),
    });
  }

  private getInitData(): {
    name: string;
    imagePath: string;
    description: string;
    ingredients: FormArray;
  } {
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
            this.createIngredientsFormGroup(ingredient.name, ingredient.amount)
          );
        }
      }
    }
    return { name, imagePath, description, ingredients };
  }

  private createIngredientsFormGroup(
    name: string,
    amount: number
  ): FormGroup<{
    name: FormControl<string>;
    amount: FormControl<number>;
  }> {
    return new FormGroup({
      name: new FormControl(name, Validators.required),
      amount: new FormControl(amount, [
        Validators.required,
        Validators.pattern(/^[1-9]+[0-9]*$/),
      ]),
    });
  }
}
