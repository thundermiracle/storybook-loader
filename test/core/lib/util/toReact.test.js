import { toReact } from 'core/lib/util';

test('[string]input is string', () => {
  const originStr = 'origin';
  const result = toReact(originStr);
  expect(typeof result).toEqual('function');
});
