export type TSubscriptionTracking = 'lifetime' | 'concurrent' | 'unlimited';

export interface IUserSubscriptionLimits {
  max_projects: number | null;
  max_files: number | null;
  max_inspirations: number | null;
  max_investors_per_project: number | null;
  files_tracking: TSubscriptionTracking;
  inspirations_tracking: TSubscriptionTracking;
}

export interface IUserSubscriptionUsage {
  active_owned_projects: number;
  files_used: number;
  inspirations_used: number;
  lifetime_files_created: number;
  lifetime_inspirations_created: number;
  concurrent_files: number;
  concurrent_inspirations: number;
}

export interface IUserSubscription {
  plan_key: string;
  display_name: string;
  billing_type: string;
  price_amount: number | null;
  currency: string;
  shows_ads: boolean;
  subscription_status?: string;
  billing_provider?: string;
  external_subscription_id?: string;
  subscription_period_end?: string;
  limits: IUserSubscriptionLimits;
  usage: IUserSubscriptionUsage;
}
