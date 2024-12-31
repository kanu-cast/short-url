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
app.use(express.static(path.join(__dirname, '../views')));

app.use(urlRoutes);

// Serve index.html for the root path
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/index.html'));
});


app.listen(port, () => {
  console.log(`Server is running on PORT${port}`);
});
