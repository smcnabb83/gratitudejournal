const errorTypes = {
  INVALID_TOKEN:
    'The supplied token is either not valid, is malformed, or is expired. Please log in again',
  ALREADY_LOGGED_IN: 'The user is already logged in',
  INVALID_USERNAME_PASSWORD:
    'The username and password provided were either invalid, or the username does not exist. If you believe this was in error, please contact the webmaster',
  EMAIL_ADDRESS_REQUIRED: 'An email address is required',
  USER_EXISTS: 'The email provided is already associated with a user account.',
  EMAIL_ADDRESS_INVALID: 'The email address supplied is invalid',
  PASSWORD_REQUIRED: 'A password is required',
  PASSWORD_LENGTH: 'The password supplied must be at least 8 characters',
  PASSWORD_REPEAT_DOES_NOT_MATCH: 'The passwords provided do not match',
  USER_CREATION_ERROR:
    'There was an error creating an account. Please try again. If you continue to receive this message, please contact the webmaster.',
  USER_NOT_LOGGED_IN: 'The user must be logged in to perform this action',
  USER_NOT_AUTHORIZED: 'The user is not authorized to view this entry',
};

module.exports = { errorTypes };
