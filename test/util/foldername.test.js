import { foldername } from '../../src/util';

test('. folder', () => {
  const result = foldername('.');
  const expected = '.';

  expect(result).toEqual(expected);
});

test('normal folder with .', () => {
  const result = foldername('./path1/path2/file1.md');
  const expected = 'path1/path2';

  expect(result).toEqual(expected);
});

test('normal folder without .', () => {
  const result = foldername('/path1/path2/file1.md');
  const expected = 'path1/path2';

  expect(result).toEqual(expected);
});
