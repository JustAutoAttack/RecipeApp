export interface Subscription {
  id: string;
  user_id: string;
  tier: string;
  activity_status: string;
  stripe_customer_id: string | null;
  stripe_subscription_id: string | null;
  current_period_end: string | null;
  updated_at: string;
  created_at: string;
}
