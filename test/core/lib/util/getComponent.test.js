import { getComponent } from 'core/lib/util';

import IMPExportDefaultFunction from './functionsMock/ExportDefaultFunction';
import IMPModuleExportFunction from './functionsMock/ModuleExportFunction';

const REQExportDefaultFunction = require('./functionsMock/ExportDefaultFunction');
const REQModuleExportFunction = require('./functionsMock/ModuleExportFunction');

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
