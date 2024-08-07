import express from 'express';
import Url from '../models/url';
import { encode } from '../utils/base58';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

router.post('/shorten', async (req, res) => {
  const { longUrl } = req.body;
  const existingUrl = await Url.findOne({ longUrl });

  if (existingUrl) {
    res.json({
      longUrl: existingUrl.longUrl,
      shortUrl: `${process.env.BASE_URL}/${existingUrl.shortUrl}`
    });
  } else {
    const urlCount = await Url.countDocuments();
    const shortUrl = encode(urlCount + 1);

    const newUrl = new Url({
      longUrl,
      shortUrl
    });

    await newUrl.save();
    res.json({
      longUrl: newUrl.longUrl,
      shortUrl: `${process.env.BASE_URL}/${newUrl.shortUrl}`
    });
  }
});

export default router;
