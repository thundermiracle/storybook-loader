import { getComponent } from 'core/lib/util';

import IMPExportDefaultFunction from './mocks/ExportDefaultFunction';
import IMPModuleExportFunction from './mocks/ModuleExportFunction';

const REQExportDefaultFunction = require('./mocks/ExportDefaultFunction');
const REQModuleExportFunction = require('./mocks/ModuleExportFunction');

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
