"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const urlSchema = new mongoose_1.Schema({
    longUrl: {
        type: String,
        required: true
    },
    shortUrl: {
        type: String,
        required: true,
        unique: true
    }
}, {
    timestamps: true
});
const Url = (0, mongoose_1.model)('Url', urlSchema);
exports.default = Url;
