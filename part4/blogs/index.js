const app = require('./app')  // the actual Express application
const config = require('./utils/config')
const logger = require('./utils/logger')


app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})



/*app.listen() is a method in Express.js used to start a server that listens
 for incoming client connections on the specified port.
 It binds and listens for connections on a specified host and port, creating an
 HTTP server behind the scenes. */