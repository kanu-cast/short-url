"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const url_1 = __importDefault(require("../models/url"));
const base58_1 = require("../utils/base58");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const router = express_1.default.Router();
router.post('/shorten', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { longUrl } = req.body;
    const existingUrl = yield url_1.default.findOne({ longUrl });
    if (existingUrl) {
        res.json({
            longUrl: existingUrl.longUrl,
            shortUrl: `${process.env.BASE_URL}/${existingUrl.shortUrl}`
        });
    }
    else {
        const urlCount = yield url_1.default.countDocuments();
        const shortUrl = (0, base58_1.encode)(urlCount + 1);
        const newUrl = new url_1.default({
            longUrl,
            shortUrl
        });
        yield newUrl.save();
        res.json({
            longUrl: newUrl.longUrl,
            shortUrl: `${process.env.BASE_URL}/${newUrl.shortUrl}`
        });
    }
}));
exports.default = router;
