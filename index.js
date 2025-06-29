const express = require('express');
const app = express();

app.get('*', (req, res) => {
  const host = req.headers.host; // e.g. subdomain.mydomain.com
  const domain = 'mydomain.com'; // replace with your domain
  let subdomain = '';

  if (host.endsWith(domain)) {
    subdomain = host.slice(0, host.length - domain.length - 1); // get subdomain part
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
