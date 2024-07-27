export interface ApiCategory {
  type: 'income' | 'expense';
  name: string;
}

export interface ApiCategories {
  [key: string]: ApiCategory;
}

export interface Category extends ApiCategory {
  id: string;
}