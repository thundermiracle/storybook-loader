import { toList } from 'core/lib/util';

test('input is not array', () => {
  const originStr = 'origin';
  const result = toList(originStr);
  expect(result).toEqual([originStr]);
});

test('input is array', () => {
  const originStr = ['origin'];
  const result = toList(originStr);
  expect(result).toEqual(originStr);
});
