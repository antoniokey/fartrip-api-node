export const authenticateUser = (username: any, password: any): Promise<any> => {
  return Promise.resolve({ username, password });
};
