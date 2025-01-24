export type ErrCallbackType = (err: { [key: string]: string }) => void

export type LoginParams = {
  email: string
  password: string
  rememberMe?: boolean
}

export type UserDataType = {
  id: number
  role: string
  email: string
  fullName: string
  username: string
  password: string
  avatar?: string | null
}
export type Currency = {
  id: number;
  code: string;
  name: string;
  symbol: string;
  is_active: boolean;
  is_source_currency: boolean;
  is_destination_currency: boolean;
}

export type AuthValuesType = {
  loading: boolean
  logout: () => void
  user: UserDataType | null
  setLoading: (value: boolean) => void
  setUser: (value: UserDataType | null) => void
  login: (params: LoginParams, errorCallback?: ErrCallbackType) => void
}

export interface LoginResponse {
  refresh_token: string;
  access_token: string;
  access_token_expires_in: number;
  refresh_token_expires_in: number;
  first_name: string,
  last_name: string,
  role: string,
  user_id: number
}


export interface ErrorItem {
  errors: any;
  attr?: any;
  detail?: string;
  code?: string;
}
