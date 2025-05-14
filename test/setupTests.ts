import './__mocks__/react-router-dom';
//

// Mock global window object properties needed by the app
window.RUNTIME_CONFIG = {
  ENV: 'dev', // Use a valid Environment type for tests
  IAM_BASE_URL: '',
  MESSAGE_BASE_URL: '',
  RELEASE_BASE_URL: '',
  USERS_BASE_URL: '',
  API_BASE_URL: '',
  MOCK_URL: '',
};
