import { encode, decode } from '../utils/base58.utils';

test('encode should convert number to base58', () => {
  expect(encode(1)).toBe('2');
  expect(encode(58)).toBe('21');
});

test('decode should convert base58 to number', () => {
  expect(decode('2')).toBe(1);
  expect(decode('21')).toBe(58);
});
