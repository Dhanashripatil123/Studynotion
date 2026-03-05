const http = require('http');

const email = process.argv[2] || 'pravinpatildhl@gmail.com';
const data = JSON.stringify({ email });

const options = {
  hostname: 'localhost',
  port: 4000,
  path: '/api/v1/auth/sendotp',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(data),
  },
};

const req = http.request(options, (res) => {
  console.log(`Status: ${res.statusCode}`);
  let body = '';
  res.on('data', (chunk) => (body += chunk));
  res.on('end', () => {
    console.log('Response body:', body);
  });
});

req.on('error', (e) => {
  console.error('Request error:', e);
});

req.write(data);
req.end();
