export enum OAuthErrorMessage {
  MissingAuthHeader = 'The authorization header is required!',
  IncorrectAuthHeader = 'The authorization header is incorrect!',
  AccessTokenTokenExpired = 'The access token is expired!',
  MissingGrantType = 'The grant_type parameter is missing!',
  IncorrectGrantType = 'The grant_type parameter contains incorrect value!',
  MissingCredentials = 'The username and password are required!',
  UserNotFound = 'Email or password is incorrect!',
}
