export type GetAllTenants = {
  id: string
  name: string
  avatar: string
  isFriend: boolean
  connections: string
}

export type GetAllHistories ={
  history_user__email: string
  history_date: string
  history_type: string
  fields: object
}

export type GetAllPurposes = {
  id: string
  label: string
}

export type GetAllBanks = {
  id: string
  currency: string
  currency_code: string
  name: string
  code: string
  is_active: boolean
}

export type GetAllOfflineAccounts = {
  id: string
  account_name: string
  account_number: string
  bank_name: string
  tenant: string
  currency: string
  currency_code: string
}

export type GetRateNotification = {
  created_on: string
  created_by_name: string
}
export type GetAnnouncements = {
  id: string
  created_on: string
  updated_on: string
  subject: string
  message: string
  type: string
  created_by: string
  updated_by: string

}

export type StaffRoles ={
  id: number
  name: string
  permissions: Array<string> //
}

export type GetTenantDetails ={
  created_on: string
  updated_on: string
  name: string
  is_active: boolean
  theme_id: number
  company_short_name: string
  company_full_name: string
  company_address: string
  company_email: string
  tagline: string
  tagline_note: string
  smtp_email_from: string
  is_fully_whitelisted: boolean
  default_fee_type: string
  facebook_url: string
  twitter_url: string
  playstore_url: string
  appstore_url: string
  created_by: string
  updated_by: string
}

export type GetAllCurrencies = {
  id: string;
  code: string;
  name: string;
  symbol: string;
  is_source_currency: boolean;
  is_destination_currency: boolean;
  is_active: boolean;
};

export type ErrorItem = {
  errors: any;
  attr?: any;
  detail?: string;
  code?: string;
}

export type GetCurrencyDetails = {
  id: number;
  code: string;
  name: string;
  symbol: string;
  is_source_currency: boolean;
  is_destination_currency: boolean;
  is_active: boolean;
};

export type GetAllBrokersRate = {
    id: number;
    partner_category: number;
    partner_category_name: string;
    source_currency: number;
    source_currency_symbol: string;
    source_currency_code: string;
    destination_currency: number;
    destination_currency_symbol: string;
    destination_currency_code: string;
    rate: string;
    remark: string;
};

export type AddBrokersRate = {
  partner_category: string;
  source_currency: number;
  destination_currency: number;
  rate: number;
  remark: string;
};

export type GetPartnerCategory = {
  id: string;
  label: string;
  description: boolean;
};

export type GetAllGlobalLimit = {
  id: number;
  currency: number;
  daily_limit: string;
  weekly_limit: string;
  monthly_limit: string;
};

export type GetAllUserLimit = {
  id: number;
  currency: number;
  daily_limit: string;
  weekly_limit: string;
  monthly_limit: string;
  user: string;
  email?: string;
};

export type AddGlobalLimit = {
  currency: number;
  daily_limit: string;
  weekly_limit: string;
  monthly_limit: string;
  email: string;
};

export type AddUserLimit = {
  currency: number;
  daily_limit: string;
  weekly_limit: string;
  monthly_limit: string;
  user: string;
};
