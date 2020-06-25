export interface OAuthTokenResponse {
  access_token: string,
  refresh_token: string,
  token_type: string,
  role: string,
  expires_in: number,
  email: string,
  id?: number
};
