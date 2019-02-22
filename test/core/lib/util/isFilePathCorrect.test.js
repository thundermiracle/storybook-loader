import { isFilePathCorrect } from 'core/lib/util';

const fPath = './path1/path2/file1.md';

test('without regexp', () => {
  const result = isFilePathCorrect(fPath);
  const expected = true;

  expect(result).toEqual(expected);
});

test('includeRegexp-- correct regexp', () => {
  const result = isFilePathCorrect(fPath, /path2/);
  const expected = true;

  expect(result).toEqual(expected);
});

test('includeRegexp-- wrong regexp', () => {
  const result = isFilePathCorrect(fPath, /path3/);
  const expected = false;

  expect(result).toEqual(expected);
});

test('excludeRegexp-- correct regexp', () => {
  const result = isFilePathCorrect(fPath, /.md$/, /path1/);
  const expected = false;

  expect(result).toEqual(expected);
});

test('excludeRegexp-- wrong regexp', () => {
  const result = isFilePathCorrect(fPath, /.md$/, /path3/);
  const expected = true;

  expect(result).toEqual(expected);
});

test('includeRegexp, excludeRegexp-- include wrong', () => {
  const result = isFilePathCorrect(fPath, /path4/, /path3/);
  const expected = false;

  expect(result).toEqual(expected);
});

test('return file without extentions', () => {
  const result = isFilePathCorrect('./path1/sub1/file');
  const expected = true;

  expect(result).toEqual(expected);
});
