export type Environment = 'dev' | 'npp' | 'prod';

export interface RuntimeConfig {
  IAM_BASE_URL: string;
  MESSAGE_BASE_URL: string;
  RELEASE_BASE_URL: string;
  USERS_BASE_URL: string;
  API_BASE_URL: string;
  ENV: Environment;
  MOCK_URL: string;
}

declare global {
  interface Window {
    RUNTIME_CONFIG: RuntimeConfig;
  }
}

export {};
