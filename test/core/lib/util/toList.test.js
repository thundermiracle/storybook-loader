import { toList } from 'core/lib/util';

import { reqWithRegExp } from 'test/mocks/reqMock';

test('[string]input is not array', () => {
  const originStr = 'origin';
  const result = toList(originStr);
  expect(result).toEqual([originStr]);
});

test('[string]input is array', () => {
  const originStr = ['origin'];
  const result = toList(originStr);
  expect(result).toEqual(originStr);
});

test('[object]input is not array', () => {
  const originObj = reqWithRegExp;
  const result = toList(originObj);
  expect(result).toEqual([originObj]);
});

test('[object]input is array', () => {
  const originObj = [reqWithRegExp];
  const result = toList(originObj);
  expect(result).toEqual(originObj);
});
