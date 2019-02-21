import { getComponent } from 'core/lib/util';

import IMPExportDefaultFunction from 'test/mocks/ExportDefaultFunction';
import IMPModuleExportFunction from 'test/mocks/ModuleExportFunction';

const REQExportDefaultFunction = require('test/mocks/ExportDefaultFunction');
const REQModuleExportFunction = require('test/mocks/ModuleExportFunction');

test('import-- export default function', () => {
  const func = getComponent(IMPExportDefaultFunction);
  const result = func();

  expect(result).toEqual('ExportDefaultFunction');
});

test('import-- module.exports function', () => {
  const func = getComponent(IMPModuleExportFunction);
  const result = func();

  expect(result).toEqual('ModuleExportFunction');
});

test('require-- export default function', () => {
  const func = getComponent(REQExportDefaultFunction);
  const result = func();

  expect(result).toEqual('ExportDefaultFunction');
});

test('import-- module.exports function', () => {
  const func = getComponent(REQModuleExportFunction);
  const result = func();

  expect(result).toEqual('ModuleExportFunction');
});
