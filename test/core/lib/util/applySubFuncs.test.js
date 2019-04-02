import log from 'core/lib/logger';
import { applySubFuncs } from 'core/lib/util';

jest.mock('core/lib/logger');

const baseObj = {
  result: '',
  func1() {
    this.result += 'func1';
  },
  func2() {
    this.result += 'func2';
  },
  func3(msg1, msg2) {
    this.result += `func3[${msg1}${msg2}]`;
  },
  clear() {
    this.result = '';
  },
};

afterEach(() => {
  baseObj.clear();
});

test('no funcList', () => {
  applySubFuncs(baseObj);
  expect(baseObj.result).toEqual('');
});

test('function name is string', () => {
  applySubFuncs(baseObj, ['func1']);
  expect(baseObj.result).toEqual('func1');
});

test('function name is array', () => {
  applySubFuncs(baseObj, [['func1']]);
  expect(baseObj.result).toEqual('func1');
});

test('mix function name', () => {
  applySubFuncs(baseObj, [['func1'], 'func2']);
  expect(baseObj.result).toEqual('func1func2');
});

test('function with parameter', () => {
  applySubFuncs(baseObj, [['func3', ['A', 'B']]]);
  expect(baseObj.result).toEqual('func3[AB]');
});

test('function not exist', () => {
  applySubFuncs(baseObj, ['func111', ['func222'], ['func333', ['A', 'B']]]);
  expect(baseObj.result).toEqual('');
});

test('parameter is not an array', () => {
  applySubFuncs(baseObj, [['func3', 'A', 'B']]);
  expect(baseObj.result).toEqual('');
  expect(log.error).toHaveBeenCalledTimes(1);
});
