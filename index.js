const express = require('express');
const app = express();

app.get('*', (req, res) => {
  const host = req.headers.host; // e.g. subdomain.imyme.in
  const domain = 'imyme.in'; // ← Make sure this matches your actual domain
  let subdomain = '';

  console.log(`Incoming request on host: ${host}`);

  if (host && host.endsWith(domain)) {
    subdomain = host.slice(0, host.length - domain.length - 1); // remove ".imyme.in"
    console.log(`Detected subdomain: ${subdomain}`);
  } else {
    console.log(`No matching domain found in host: ${host}`);
  }

  const html = `
    <html>
      <body>
        <h1>Hello from subdomain: ${subdomain || 'no subdomain'}</h1>
      </body>
    </html>
  `;

  res.send(html);
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
