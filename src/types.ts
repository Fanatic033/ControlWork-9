export interface ApiCategory {
  type: 'income' | 'expense';
  name: string;
}



export interface Category extends ApiCategory {
  id: string;
}

export interface Transaction {
  id: string;
  amount: number;
  categoryID: string;
  type: 'income' | 'expense';
  createdAt: string;
}

export interface ApiTransaction {
  amount: number;
  categoryID: string;
  type: 'income' | 'expense';
  createdAt: string;
}