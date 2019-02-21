import { isRequireContextRegExpPassed } from 'core/lib/util';

test('no regexp passed to require.context', () => {
  const req = {
    id: './stories sync recursive ^\\.\\/.*$',
  };

  const result = isRequireContextRegExpPassed(req);

  expect(result).toEqual(false);
});

test('regexp passed to require.context', () => {
  const req = {
    id: './stories sync recursive \\.md$/',
  };

  const result = isRequireContextRegExpPassed(req);

  expect(result).toEqual(true);
});
