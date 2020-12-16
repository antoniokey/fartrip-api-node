export const getDatabaseName = (): string => {
  const environment = process.env.NODE_ENV;

  switch (environment) {
    case 'test': {
      return process.env.TEST_DB_NAME || '';
    }
    case 'production': {
      return process.env.PROD_DB_NAME || '';
    }
    default: {
      return process.env.DEV_DB_NAME || '';
    }
  }
};
