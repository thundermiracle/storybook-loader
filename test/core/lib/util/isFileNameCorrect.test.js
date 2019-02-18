import { isFileNameCorrect } from 'core/lib/util';

const fPath = './path1/path2/file1.md';

test('without regexp', () => {
  const result = isFileNameCorrect(fPath);
  const expected = true;

  expect(result).toEqual(expected);
});

test('includeRegexp-- extention regexp', () => {
  const result = isFileNameCorrect(fPath, /.md$/);
  const expected = true;

  expect(result).toEqual(expected);
});

test('includeRegexp-- filename regexp', () => {
  const result = isFileNameCorrect(fPath, /ile/);
  const expected = true;

  expect(result).toEqual(expected);
});

test('includeRegexp-- wrong regexp', () => {
  const result = isFileNameCorrect(fPath, /abc/);
  const expected = false;

  expect(result).toEqual(expected);
});

test('excludeRegexp-- exclude ile', () => {
  const result = isFileNameCorrect(fPath, /.md$/, /ile/);
  const expected = false;

  expect(result).toEqual(expected);
});

test('excludeRegexp-- exclude abc', () => {
  const result = isFileNameCorrect(fPath, /.md$/, /abc/);
  const expected = true;

  expect(result).toEqual(expected);
});

test('includeRegexp, excludeRegexp-- include wrong', () => {
  const result = isFileNameCorrect(fPath, /abc/, /abc/);
  const expected = false;

  expect(result).toEqual(expected);
});

test('return file without extentions', () => {
  const result = isFileNameCorrect('./path1/sub1/file');
  const expected = true;

  expect(result).toEqual(expected);
});
