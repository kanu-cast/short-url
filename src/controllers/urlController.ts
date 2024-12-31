import { Request, Response, NextFunction, Application } from "express";
import Url from "../models/url";
import crypto from "crypto";
//import redisClient from "../utils/redisClient";
import dotenv from "dotenv";
import { BadRequestError, NotFoundError } from "express-customize-errors";
dotenv.config();

// Generating a random short code
const generateShortCode = (): string => {
  return crypto.randomBytes(6).toString("hex"); 
};

// POST /api/shorten - Shorten URL
export const shortenUrl = async (req: Request, res: Response, next: NextFunction):Promise<any | undefined> => {
  const { originalUrl } = req.body;

  // Validation the URL
  const urlRegex = /^(https?:\/\/)?([\w\d\-]+\.)+[a-z]{2,6}(\/[^\s]*)?$/i;
  if (!urlRegex.test(originalUrl)) {
    return next(new BadRequestError('Route Not Found'));
  }

  // Checking if the URL already exists
  const existingUrl = await Url.findOne({ originalUrl });
  if (existingUrl) {
    return res.json({ shortUrl: `${process.env.BASE_URL}/${existingUrl.shortCode}` });
  }

  // Generating a new short code
  const shortCode = generateShortCode();
  
  const newUrl = new Url({
    originalUrl,
    shortCode,
    clickCount: 0,
  });

  await newUrl.save();

  // Storin in Redis for caching
  //redisClient.set(shortCode, originalUrl);

  res.status(201).json({
    shortUrl: `${process.env.BASE_URL}/${shortCode}`,
  });
};



// GET /:shortCode - Redirect to the original URL
export const redirectToUrl = async (req: Request, res: Response, next: NextFunction):Promise<any | undefined> => {
  const { shortCode } = req.params;

  // First, check Redis cache
//   const cachedUrl = await redisClient.get(shortCode);
//   if (cachedUrl) {
//     await Url.findOneAndUpdate({ shortCode }, { $inc: { clickCount: 1 } });
//     return res.redirect(cachedUrl);
//   }

  // Checking if URL exists in the DB
  const url = await Url.findOne({ shortCode });
  if (!url) {
    return next(new NotFoundError('Route Not Found'));
  }

  // Incrementing click counts
  await Url.findOneAndUpdate({ shortCode }, { $inc: { clickCount: 1 } });

  // Caching the URL in Redis
  //redisClient.set(shortCode, url.originalUrl);

  res.redirect(url.originalUrl);
};



// GET /api/stats/:code - Get URL click count
export const getUrlStats = async (req: Request, res: Response, next: NextFunction):Promise<any | undefined> => {
  const { code } = req.params;

  const url = await Url.findOne({ shortCode: code });
  if (!url) {
    return next(new NotFoundError('Route Not Found'))
  }

  res.json({ clickCount: url.clickCount });
};
