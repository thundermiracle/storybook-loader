const logger = console;

const LogLevel = {
  silent: 0,
  error: 1,
  warn: 2,
  info: 3,
  debug: 4,
};

function loggerFunctionMaker(logLevel) {
  return function(type) {
    return function(...params) {
      if (logLevel >= LogLevel[type]) {
        logger[type](...params);
      }
    };
  };
}

function CustomLogger(logLevel) {
  const loggerTypes = ['error', 'warn', 'info', 'debug'];

  return loggerTypes.reduce((funcObj, type) => {
    funcObj[type] = loggerFunctionMaker(logLevel)(type);
    return funcObj;
  }, {});
}

let level = LogLevel[process.env.LOG_LEVEL];
if (level == null) {
  level = process.env.NODE_ENV === 'production' ? LogLevel.error : LogLevel.debug;
}

const log = new CustomLogger(level);

export { log as default, LogLevel, CustomLogger };
