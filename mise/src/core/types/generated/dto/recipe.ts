export interface Recipe {
  id: string;
  owner_id: string;
  title: string;
  cuisine: string;
  cook_time_minutes: number;
  ingredients: string;
  instructions: string;
  description: string | null;
  history: string | null;
  substitutions: string | null;
  allergens: string | null;
  image_url: string | null;
  images: string | null;
  updated_at: string;
  created_at: string;
}
