export enum OAuthErrorMessage {
  MissingAuthHeader = 'The Authorization header is required!',
  IncorrectAuthHeader = 'The Authorization header is incorrect!',
  MissingGrantType = 'The grant_type parameter is missing!',
  IncorrectGrantType = 'The grant_type parameter contains incorrect value!',
  MissingCredentials = 'The username and password are required',
  UserNotFound = 'Email of password is incorrect!'
}
