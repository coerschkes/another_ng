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
  editRecipe: Recipe;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
    });
    this.editRecipe = this.recipeService.getRecipe(this.id);
    this.editForm = new FormGroup({
      name: new FormControl(this.editRecipe.name, Validators.required),
      imagePath: new FormControl(
        this.editRecipe.imagePath,
        Validators.required
      ),
      description: new FormControl(
        this.editRecipe.description,
        Validators.required
      ),
    });
  }

  onSubmit() {
    this.recipeService.updateRecipe(
      new Recipe(
        this.id,
        this.editForm.value.name,
        this.editForm.value.description,
        this.editForm.value.imagePath,
        this.editRecipe.ingredients
      )
    );
  }
}
