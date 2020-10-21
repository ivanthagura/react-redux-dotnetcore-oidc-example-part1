import { createUserManager } from 'redux-oidc';

const userManagerConfig = {
  client_id: 'mywebappclient',
  client_secret: 'mywebappsecret',
  redirect_uri: 'https://localhost:44308/callback',
  post_logout_redirect_uri: 'https://localhost:44308/',
  response_type: 'id_token token',
  scope: 'openid profile roles',
  authority: 'https://localhost:44358/',
  silent_redirect_uri: 'https://localhost:44308/silent_renew.html',
  automaticSilentRenew: true,
  filterProtocolClaims: true,
  loadUserInfo: true,
  monitorSession: true
};

const userManager = createUserManager(userManagerConfig);

export default userManager;
