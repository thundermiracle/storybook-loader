const logger = console;

const LogLevel = {
  silent: 0,
  error: 1,
  warn: 2,
  info: 3,
  debug: 4,
};

function loggerFunctionMaker(logLevel = LogLevel.warn) {
  return function (type) {
    return function (...params) {
      if (logLevel >= LogLevel[type]) {
        logger[type](...params);
      }
    };
  };
}

function CustomLogger(logLevel) {
  const loggerTypes = [
    'error',
    'warn',
    'info',
    'debug',
  ];

  return loggerTypes.reduce((funcObj, type) => {
    funcObj[type] = loggerFunctionMaker(logLevel)(type);
    return funcObj;
  }, {});
}

let level = LogLevel.debug;
if (process.env.NODE_ENV === 'production') {
  level = LogLevel.error;
}

const log = new CustomLogger(level);

export { log as default, LogLevel, CustomLogger };
