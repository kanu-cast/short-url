import NodeCache, { Key } from "node-cache";
import { IUrl } from "../models/url.models";

const cache = new NodeCache();

// function to cache data for 3 minutes.
const cacheData = (key: Key, body: IUrl) => {
    return cache.set(key, body, 180);
}

// function to get the cached data
const getCachedData = (key: Key) => {
    return cache.get(key);
}

export {
    cacheData,
    getCachedData
}
