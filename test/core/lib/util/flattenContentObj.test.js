import { flattenContentObj } from 'core/lib/util';

test('no groupFolder', () => {
  const contentObj = { a1: '111', b1: '222' };
  const expected = [['', [['a1', '111'], ['b1', '222']]]];

  const result = flattenContentObj(contentObj);
  expect(result).toEqual(expected);
});

test('have groupFolder', () => {
  const contentObj = { fa: { a1: '111', a2: '112' }, fb: { b1: '222' } };
  const expected = [['fa', [['a1', '111'], ['a2', '112']]], ['fb', [['b1', '222']]]];

  const result = flattenContentObj(contentObj, true);
  expect(result).toEqual(expected);
});

test('have groupFolder and nested array', () => {
  const contentObj = {
    fa: { a1: ['name1', '111'], a2: ['name2', '112'] },
    fb: { b1: ['name3', '222'] },
  };
  const expected = [
    ['fa', [['a1', ['name1', '111']], ['a2', ['name2', '112']]]],
    ['fb', [['b1', ['name3', '222']]]],
  ];

  const result = flattenContentObj(contentObj, true);
  expect(result).toEqual(expected);
});
