import { Config } from '@jest/types';

const config: Config.InitialOptions = {
  verbose: true,
  testMatch: ['**/?(*.)+(test).ts'],
  preset: 'ts-jest',
};

export default config;
