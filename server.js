import express from 'express';
import fetch from 'node-fetch';
const app = express();

app.get('/proxy/avatar/:name', async (req, res) => {
  const { name } = req.params;
  const url = `https://mc-heads.net/avatar/${name}`;
  try {
    const response = await fetch(url);
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Content-Type', response.headers.get('content-type'));
    response.body.pipe(res);
  } catch (error) {
    res.status(500).send('Error fetching image');
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});
