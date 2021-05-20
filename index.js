'use strict';

const http = require('http');
const chalk = require('chalk');

const bootstrap = require('./src/infrastructure/config/bootstrap');
const environment = require('./src/infrastructure/config/environment');
const getApp = require('./src/infrastructure/webserver/express-app');

async function main() {
  const appContext = await bootstrap();
  const app = getApp(appContext);

  // TODO: add support for https
  const server = http.createServer(app);

  server.listen(environment.server.port, () => {
    console.log(
      chalk.green(
        `Server listening on port ${environment.server.port}`
      )
    );
  });
}


main()
  .catch(error => {
    // TODO: log this error in a .log file
    console.error(`appError: ${error.stack}`);
    process.exit(-1);
  })

process.on('uncaughtException', (error) => {
  // TODO: log this error in a .log file
  console.error(`uncaughtException: ${error.stack}`);
  process.exit(-1);
});

process.on("unhandledRejection", (reason, promise) => {
  // TODO: log this error in a .log file
  console.error(`unhandledRejection: ${reason}`);
  process.exit(-1);
});