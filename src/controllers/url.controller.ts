import { Request, Response } from "express";
import {
  shortenUrlService,
  getSingleUrl,
} from "../services/url.services";
import responseHandler from "../utils/responseHandler";
import { IUrl, Url } from "../models/url.models";
import { cacheData } from "../utils/caches.utils";


// POST /api/shorten - Shorten URL
export const shortenUrl = async (req: Request, res: Response): Promise<any | undefined> => {
  const { originalUrl } = req.body;

  try {
    // Validating URL format
    const urlRegex = /^(https?:\/\/)?([\w\d\-]+\.)+[a-z]{2,6}(\/[^\s]*)?$/i;
    if (!urlRegex.test(originalUrl)) {
      return responseHandler(res, "Invalid URL provided", 400);
    }

    const newUrl = await shortenUrlService(originalUrl);
    
    // cache the newly created data.
    cacheData(newUrl.shortCode, newUrl);


    return responseHandler(res, "URL shortened successfully.", 201, {
      shortUrl: `${process.env.BASE_URL}/${newUrl.shortCode}`,
    })

  } catch (error: unknown) {
    return responseHandler(res, "Internal server error.", 500);
  }
};

// GET /:shortCode - Redirect to the original URL
export const redirectToUrl = async (req: Request, res: Response): Promise<any | undefined> => {
  const { shortCode } = req.params;

  try {
    const url: IUrl = await getSingleUrl(shortCode);

    // const url = await redirectToUrlService(shortCode);

    if (!url) {
      return responseHandler(res, "URL not found", 404);
    }

      // Incrementing the click count
    await Url.updateOne({ shortCode }, { $inc: { clickCount: 1 } });

    return res.redirect(url.originalUrl);
  } catch (error: unknown) {

    return responseHandler(res, "Internal server error.", 500);
  }
};

// GET /api/stats/:code - Get URL click count
export const getUrlStats = async (req: Request, res: Response): Promise<any | undefined> => {
  const { code } = req.params;

  try {

    const url: IUrl = await getSingleUrl(code);

    if (!url) {
      return responseHandler(res, "URL not found", 404);
    }

    return responseHandler(res, " Number of clicks.", 200, {
      clickCount: url.clickCount
    });

  } catch (error: unknown) {
    return responseHandler(res, "Internal server error.", 500);
  }
};
