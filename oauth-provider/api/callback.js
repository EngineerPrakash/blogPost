module.exports = async (req, res) => {
  try {
    const clientId = process.env.OAUTH_CLIENT_ID;
    const clientSecret = process.env.OAUTH_CLIENT_SECRET;
    const redirectUri = process.env.OAUTH_REDIRECT_URI;
    if (!clientId || !clientSecret || !redirectUri) {
      res.statusCode = 500;
      res.end('Missing OAuth env vars');
      return;
    }
    const url = new URL(req.url, `http://${req.headers.host}`);
    const code = url.searchParams.get('code');
    const state = url.searchParams.get('state');
    const cookie = (req.headers.cookie || '').split(';').map(s=>s.trim()).find(s=>s.startsWith('decap_oauth_state='));
    const cookieState = cookie ? cookie.split('=')[1] : '';
    if (!code || !state || state !== cookieState) {
      res.statusCode = 400;
      res.end('Invalid state or missing code');
      return;
    }
    const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({ client_id: clientId, client_secret: clientSecret, code, redirect_uri: redirectUri })
    });
    const data = await tokenRes.json();
    if (!data.access_token) {
      res.statusCode = 400;
      res.end('Failed to get token: ' + JSON.stringify(data));
      return;
    }
    const token = data.access_token;
    const origins = (process.env.ALLOWED_ORIGINS || '').split(',').map(s=>s.trim()).filter(Boolean);
    const originList = origins.length ? JSON.stringify(origins) : 'null';
    const payload = JSON.stringify({ token });
    const html = `<!doctype html><meta charset="utf-8"><script>
      (function() {
        var payload = ${JSON.stringify(payload)};
        function send(to){ try{ to.postMessage('authorization:github:success:' + payload, '*'); }catch(e){} }
        if (window.opener) send(window.opener);
        if (window.parent) send(window.parent);
        window.close();
      })();
    </script><p>Authentication complete. You can close this window.</p>`;
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.statusCode = 200;
    res.end(html);
  } catch (e) {
    res.statusCode = 500;
    res.end('Error: ' + e.message);
  }
};

