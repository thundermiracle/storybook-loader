const logFuncs = ['error', 'warn', 'info', 'debug'];

logFuncs.forEach(funcName => {
  jest.spyOn(console, funcName).mockImplementation(() => {});
});

beforeEach(() => {
  jest.clearAllMocks();
  jest.resetModules();
});

function callAllLogFuncs(logger) {
  logFuncs.forEach(funcName => {
    logger[funcName](funcName);
  });
}

function resultChecker(errorResult, warnResult, infoResult, debugResult) {
  expect(console.error).toHaveBeenCalledTimes(errorResult);
  expect(console.warn).toHaveBeenCalledTimes(warnResult);
  expect(console.info).toHaveBeenCalledTimes(infoResult);
  expect(console.debug).toHaveBeenCalledTimes(debugResult);
}

test('no LOG_LEVEL, NODE_ENV=production', () => {
  process.env.NODE_ENV = 'production';
  const logger = require('core/lib/logger').default;
  callAllLogFuncs(logger);
  resultChecker(1, 0, 0, 0);
});

test('no LOG_LEVEL, NODE_ENV=development', () => {
  process.env.NODE_ENV = 'development';
  const logger = require('core/lib/logger').default;
  callAllLogFuncs(logger);
  resultChecker(1, 1, 1, 1);
});

test('LOG_LEVEL error', () => {
  process.env.NODE_ENV = 'development';
  process.env.LOG_LEVEL = 'error';
  const logger = require('core/lib/logger').default;
  callAllLogFuncs(logger);
  resultChecker(1, 0, 0, 0);
});

test('LOG_LEVEL warn', () => {
  process.env.NODE_ENV = 'production';
  process.env.LOG_LEVEL = 'warn';
  const logger = require('core/lib/logger').default;
  callAllLogFuncs(logger);
  resultChecker(1, 1, 0, 0);
});

test('LOG_LEVEL info', () => {
  process.env.LOG_LEVEL = 'info';
  const logger = require('core/lib/logger').default;
  callAllLogFuncs(logger);
  resultChecker(1, 1, 1, 0);
});

test('LOG_LEVEL debug', () => {
  process.env.LOG_LEVEL = 'debug';
  const logger = require('core/lib/logger').default;
  callAllLogFuncs(logger);
  resultChecker(1, 1, 1, 1);
});
