import { applyFuncList } from 'core/lib/util';

function func1(inputStr) {
  inputStr += 'func1';
  return inputStr;
}

function func2(inputStr) {
  inputStr += 'func2';
  return inputStr;
}

test('funcList is empty', () => {
  const originStr = 'origin';
  const result = applyFuncList(originStr);
  expect(result).toEqual(originStr);
});

test('funcList is ok', () => {
  const originStr = 'origin';
  const result = applyFuncList(originStr, [func1, func2]);
  expect(result).toEqual(`${originStr}func1func2`);
});
