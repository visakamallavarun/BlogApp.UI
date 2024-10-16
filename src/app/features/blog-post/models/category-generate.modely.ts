import { Category } from "blog-category";


export interface GenerateCategoryResponse {
  newCategory: Category;
  allCategories: Category[];
}