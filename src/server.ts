import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import connectDB from './config/mongoose';
import urlRoutes from './routes/url';
import Url from './models/url';

const app = express();
const port = 3000;

// Connect to MongoDB
connectDB();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../public')));

app.use('/api/url', urlRoutes);

// Serve index.html for the root path
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.get('/:shortUrl', async (req, res) => {
    const { shortUrl } = req.params;
    const url = await Url.findOne({ shortUrl });
  
    if (url) {
      res.redirect(url.longUrl);
    } else {
      res.status(404).json('No URL found');
    }
});

app.listen(port, () => {
  console.log(`Server is running on PORT${port}`);
});
