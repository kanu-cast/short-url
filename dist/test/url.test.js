"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base58_1 = require("../utils/base58");
test('encode should convert number to base58', () => {
    expect((0, base58_1.encode)(1)).toBe('2');
    expect((0, base58_1.encode)(58)).toBe('21');
});
test('decode should convert base58 to number', () => {
    expect((0, base58_1.decode)('2')).toBe(1);
    expect((0, base58_1.decode)('21')).toBe(58);
});
