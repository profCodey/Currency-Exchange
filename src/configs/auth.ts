export default {
  meEndpoint: '/auth/me',
  loginEndpoint: '/jwt/login',
  registerEndpoint: '/jwt/register',
  storageTokenKeyName: 'accessToken',
  onTokenExpiration: 'refreshToken' // logout | refreshToken
}


export const AUTH_TOKENS = {
  ACCESS_TOKEN: "pycl_access_token",
  REFRESH_TOKEN: "pycl_refresh_token",
  CATEGORY: "pycl_category",
  USERID: "pycl_user_id",
  FIRST_NAME: "pycl_first_name",
  LAST_NAME: "pycl_last_name",
  ROLE: "pycl_role"
};
