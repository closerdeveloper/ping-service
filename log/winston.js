const { createLogger, format, transports } = require('winston');
const { combine, label, printf } = format;
const moment = require('moment-timezone');
var appRoot = require('app-root-path');

const LogFormat = printf(info => `${info.timestamp} [${info.level}]: ${info.label} - ${info.message}`);
const appendTimestamp = format((info, opts) => {
    if(opts.tz)
      info.timestamp = moment().tz(opts.tz).format();
    return info;
  });
var options = {
    file: {
        level: 'debug',
        filename: `${appRoot}/logs/app.log`,
        handleExceptions: true,
        json: false,
        maxsize: 5242880, // 5MB
        maxFiles: 3,
        colorize: false
    },
    console: {
        level: 'debug',
        handleExceptions: true,
        json: false,
        colorize: true,
        timestamp:true
    },
};


const logger = createLogger({
    level: 'info',
    format: combine(
      label({ label: 'beta' }),
      appendTimestamp({ tz: 'Asia/Bangkok' }),
      LogFormat
    ),
    transports: [
      new transports.Console(),
      new transports.File(options.file)
    ]
  });
// create a stream object with a 'write' function that will be used by `morgan`
logger.stream = {
    write: function (message, encoding) {
        // use the 'info' log level so the output will be picked up by both transports (file and console)
        logger.info(message);
    },
};
module.exports = logger;