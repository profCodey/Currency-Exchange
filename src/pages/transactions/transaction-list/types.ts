// import { ThemeColor } from "src/@core/layouts/types"

export type GetAllTransactions = {
  id: number;
  name: string;
  company_full_name: string;
}

export type Transactions = SingleTransactions[];


export type SingleTransactions = {
  data: any;
  id: number;
  recipients: TransactionRecipient;
  source_currency: Currency;
  destination_currency: Currency;
  created_on: string;
  updated_on: string;
  reference: string;
  source_amount: string;
  total_recipient_amount: string;
  broker_rate: string;
  partner_rate: string;
  fee: string;
  status: string;
  fee_type: string;
  transaction_type: string;
  payment_method: string;
  proof_of_payment: string | null;
  created_by: number | null;
  updated_by: number | null;
  tenant: number;
  user: number;
};
export type AllTransactions = {
  data: any;
  id: number;
  source_currency_symbol: string;
  destination_currency_symbol: string;
  created_on: string;
  source_amount: string;
  total_recipient_amount: string;
  broker_rate: string;
  partner_rate: string;
  status: string;
  fee_type: string;
  tenant_name: string;
  sender_name: string;
};

export type Currency = {
  id: number;
  code: string;
  name: string;
  symbol: string;
  is_source_currency: boolean;
  is_destination_currency: boolean;
  is_active: boolean;
};

export type TransactionRecipient = {
  id: number;
  bank_name: string;
  account_number: string;
  account_name: string;
  email: string;
  sortcode: string | null;
  amount: string;
  purpose_of_transaction: string;
  status: string;
  save_beneficiary: boolean;
  transaction: number;
  bank: number;
}[];

