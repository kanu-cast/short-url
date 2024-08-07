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
const body_parser_1 = __importDefault(require("body-parser"));
const path_1 = __importDefault(require("path"));
const mongoose_1 = __importDefault(require("./config/mongoose"));
const url_1 = __importDefault(require("./routes/url"));
const url_2 = __importDefault(require("./models/url"));
const app = (0, express_1.default)();
const port = 3000;
// Connect to MongoDB
(0, mongoose_1.default)();
app.use(body_parser_1.default.json());
app.use(express_1.default.static(path_1.default.join(__dirname, '../public')));
app.use('/api/url', url_1.default);
// Serve index.html for the root path
app.get('/', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '../public/index.html'));
});
app.get('/:shortUrl', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { shortUrl } = req.params;
    const url = yield url_2.default.findOne({ shortUrl });
    if (url) {
        res.redirect(url.longUrl);
    }
    else {
        res.status(404).json('No URL found');
    }
}));
app.listen(port, () => {
    console.log(`Server is running on PORT${port}`);
});
