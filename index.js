const express = require('express');
const app = express();
require('dotenv').config(); // Fixed this line

app.use(express.json());

const subdomainData = {};

// Middleware to extract subdomain
app.use((req, res, next) => {
  const host = req.headers.host; // e.g. sub.example.com
  const parts = host.split('.');
  
  // You can adjust the logic if using localhost:3000 (for local testing)
  req.subdomain = parts.length > 2 ? parts[0] : null;

  next();
});

// Create a new subdomain entry
app.post('/create', (req, res) => {
  const { subdomain, html } = req.body;
  if (!subdomain || !html) {
    return res.status(400).json({ error: 'Missing subdomain or html' });
  }
  if (subdomainData[subdomain]) {
    return res.status(400).json({ error: 'Subdomain already exists' });
  }

  subdomainData[subdomain] = html;
  res.json({ success: true, message: 'Subdomain created' });
});

// Serve HTML for the subdomain
app.get('*', (req, res) => {
  const html = subdomainData[req.subdomain];
  if (html) {
    res.send(html);
  } else {
    res.status(404).send('Subdomain not found');
  }
});

// Health check or main domain
app.get('/', (req, res) => {
  res.send('Express on Vercel');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
