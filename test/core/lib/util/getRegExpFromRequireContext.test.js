import { getRegExpFromRequireContext } from 'core/lib/util';

test('require.context id not exist', () => {
  const result = getRegExpFromRequireContext({});
  const expected = null;

  expect(result).toEqual(expected);
});

test('require.context id is space', () => {
  const result = getRegExpFromRequireContext({ id: '' });
  const expected = null;

  expect(result).toEqual(expected);
});

test('require.context id is correct', () => {
  const req = {
    id: 'string1 string2 recursive \\.md$',
  };

  const result = getRegExpFromRequireContext(req);
  const expected = /\.md$/;

  expect(result).toEqual(expected);
});
