import { unaryFunc } from 'core/lib/util';

function greet(name, greet1, greet2) {
  return `[${name}]: ${greet1}, ${greet2}`;
}

const greetParams = [
  'Hello',
  'World',
];

test('parameter is null', () => {
  const result = unaryFunc(greet, null);
  expect(result).toEqual(greet);
});

test('input is empty array', () => {
  const result = unaryFunc(greet);
  expect(result).toEqual(greet);
});

test('input is array', () => {
  const resultFunc = unaryFunc(greet, greetParams);

  const result = resultFunc('Daniel', 'msg1', 'msg2');
  const expected = greet('Daniel', ...greetParams);

  expect(result).toEqual(expected);
});
