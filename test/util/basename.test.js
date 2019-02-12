import { basename } from 'core/lib/util';

const fPath = './path1/path2/file1.md';

test('without regexp', () => {
  const result = basename(fPath);
  const expected = 'file1.md';

  expect(result).toEqual(expected);
});

test('with wrong regexp', () => {
  const result = basename(fPath, /.js$/);
  const expected = 'file1.md';

  expect(result).toEqual(expected);
});

test('with correct regexp', () => {
  const result = basename(fPath, /\.md$/);
  const expected = 'file1';

  expect(result).toEqual(expected);
});
