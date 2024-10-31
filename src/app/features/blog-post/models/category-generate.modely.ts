import { Category } from "@blogapp/category-lib";


export interface GenerateCategoryResponse {
  newCategory: Category;
  allCategories: Category[];
}