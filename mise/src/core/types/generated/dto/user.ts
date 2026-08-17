export interface User {
  id: string;
  username: string;
  email: string;
  password_hash: string;
  display_name: string;
  theme: string;
  allergens: string | null;
  pantry_tracking_enabled: number;
  last_connection_date: string | null;
  updated_at: string;
  created_at: string;
}
