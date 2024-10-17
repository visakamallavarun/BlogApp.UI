import { Category } from "category-lib";


export interface BlogPost {
  id: string;
  title: string;
  shortDescription: string;
  content: string;
  featuredImageUrl: string;
  urlHandle: string;
  author: string;
  publishedDate: Date;
  isVisible: boolean;
  categories: Category[];
}
