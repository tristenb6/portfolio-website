const fs = require('fs');
const path = require('path');
const https = require('https');

function readEnvFromFile(envPath) {
  try {
    const s = fs.readFileSync(envPath, 'utf8');
    const m = s.match(/^OPENAI_API_KEY=(.+)$/m);
    if (m) return m[1].trim();
  } catch (e) {
    return undefined;
  }
}

function httpGet(url, headers) {
  return new Promise((resolve, reject) => {
    const u = new URL(url);
    const options = {
      hostname: u.hostname,
      path: u.pathname + u.search,
      method: 'GET',
      headers,
    };
    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => resolve({ status: res.statusCode, body: data }));
    });
    req.on('error', reject);
    req.end();
  });
}

(async () => {
  const repoRoot = path.resolve(__dirname, '..');
  let apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    const envPath = path.join(repoRoot, '.env');
    if (fs.existsSync(envPath)) apiKey = readEnvFromFile(envPath);
  }

  if (!apiKey) {
    console.error('No OPENAI_API_KEY found in environment or .env');
    process.exit(2);
  }

  const preview = apiKey.length > 8 ? `${apiKey.slice(0,4)}......${apiKey.slice(-4)}` : apiKey;
  console.log('Using OPENAI_API_KEY preview:', preview);

  try {
    const res = await httpGet('https://api.openai.com/v1/models', {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    });
    console.log('HTTP status:', res.status);
    console.log('Body (truncated 2000 chars):\n', res.body.slice(0, 2000));
    process.exit(res.status === 200 ? 0 : 1);
  } catch (err) {
    console.error('Request failed:', err.message || err);
    process.exit(3);
  }
})();
