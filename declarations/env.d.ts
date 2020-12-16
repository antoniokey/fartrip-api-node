declare namespace NodeJS {
  interface ProcessEnv {
    DEV_ORIGIN: string;
    DEV_DB_NAME: string;
    PROD_DB_NAME: string;
    TEST_DB_NAME: string;
    DB_USERNAME: string;
    DB_PASSWORD: string;
    DB_PORT: string;
    DB_HOST: string;
    DB_DIALECT: string;
    DB_ACQUIRE: string;
    DB_IDLE: string;
    DB_POOL_MAX: string;
    DB_POOL_MIN: string;
    DB_POOL_EVICT: string;
    JWT_SECRET: string;
    CLIENT_ID: string;
    CLIENT_SECRET: string;
    NODEMAILER_EMAIL: string;
    NODEMAILER_PASSWORD: string;
    MAP_ROUTE_URL: string;
    NODE_ENV: string;
  }
}
