import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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

  private initForm() {
    this.editForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      imagePath: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
    });

    if (this.editMode) {
      this.populateForm();
    }
  }

  private populateForm() {
    const editRecipe = this.recipeService.getRecipe(this.id);
    this.editForm.setValue({
      name: editRecipe.name,
      imagePath: editRecipe.imagePath,
      description: editRecipe.description,
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

  private resetForm() {
    this.editForm.reset();
    this.editMode = false;
  }
}
