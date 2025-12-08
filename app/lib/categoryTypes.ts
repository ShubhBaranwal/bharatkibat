export interface Category {
  _id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  priority: number;
}

export interface CategoryResponse {
  ok: boolean;
  data: Category[];
  meta: {
    total: number;
    page: number;
    limit: number;
    pages: number;
  };
}