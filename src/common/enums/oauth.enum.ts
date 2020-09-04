export enum OAuthErrorMessage {
  MissingAuthHeader = 'The authorization header is required!',
  IncorrectAuthHeader = 'The authorization header is incorrect!',
  AccessTokenTokenExpired = 'The access token is expired!',
  RefreshTokenTokenExpired = 'The refresh token is expired! You need to login again!',
  MissingRefreshToken = 'The refresh_token parameter is required!',
  MissingGrantType = 'The grant_type parameter is required!',
  IncorrectGrantType = 'The grant_type parameter contains incorrect value!',
  MissingCredentials = 'The username and password are required!',
  UserNotFound = 'Email or password is incorrect!',
  IncorrectClient = 'The client id is incorrect!'
}
