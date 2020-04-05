// General status for UI client
const AppStatus = {
  LOADING: 'LOADING',
  TIMEOUT: 'TIMEOUT',
  EMPTY_DATA: 'EMPTY_DATA',
  UNKNOWN: 'UNKNOWN',
  ABORT: 'ABORT'
}

// Error message for Rest API status code
const ApiErrorMessage = {
  ACCT_LOGIN_FAILED: 'Login failed. Invalid credentials.'
}

export { AppStatus, ApiErrorMessage }