import {Url, IUrl } from '../models/url.models';
import crypto from "crypto";
import dotenv from "dotenv";
import { getCachedData, cacheData } from '../utils/caches.utils';
import { Key } from 'node-cache';

dotenv.config();

// Service for generating a random short code
const generateShortCode = (): string => {
  return crypto.randomBytes(6).toString("hex");
};

// Service for shortening a URL
export const shortenUrlService = async (originalUrl: string): Promise<IUrl> => {
  
    // Checking if the URL already exists
    const existingUrl = await Url.findOne({ originalUrl });

    if (existingUrl) {
      return existingUrl;
    }
  
    // Generating a new short code
    const shortCode = generateShortCode();
  
    // Saving the new URL to the database
    const newUrl = new Url({
      originalUrl,
      shortCode,
      clickCount: 0,
    });
  
    return await newUrl.save();
  ; 
  };

export const getSingleUrl = async (code: String): Promise<IUrl | any> => {

  const cachedData = getCachedData(code as Key);

  if (cachedData) {
    return cachedData;
  }
  
  const url = await Url.findOne({ shortCode: code });

  if (url) {
    cacheData(url?.shortCode, url);
  }

  return url;
};

