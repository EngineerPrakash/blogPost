module.exports = async (req, res) => {
  try {
    const clientId = process.env.OAUTH_CLIENT_ID;
    const redirectUri = process.env.OAUTH_REDIRECT_URI;
    if (!clientId || !redirectUri) {
      res.statusCode = 500;
      res.end('Missing OAUTH_CLIENT_ID or OAUTH_REDIRECT_URI');
      return;
    }
    const state = Math.random().toString(36).slice(2);
    res.setHeader('Set-Cookie', `decap_oauth_state=${state}; Path=/; HttpOnly; SameSite=Lax`);
    const authorizeUrl = new URL('https://github.com/login/oauth/authorize');
    authorizeUrl.searchParams.set('client_id', clientId);
    authorizeUrl.searchParams.set('redirect_uri', redirectUri);
    authorizeUrl.searchParams.set('scope', 'repo,user');
    authorizeUrl.searchParams.set('state', state);
    res.statusCode = 302;
    res.setHeader('Location', authorizeUrl.toString());
    res.end();
  } catch (e) {
    res.statusCode = 500;
    res.end('Error: ' + e.message);
  }
};

