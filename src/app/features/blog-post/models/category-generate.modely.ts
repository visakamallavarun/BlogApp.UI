import { Category } from "../../category/models/category.model";

export interface GenerateCategoryResponse {
  newCategory: Category;
  allCategories: Category[];
}