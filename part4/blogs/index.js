const app = require('./app')  // the actual Express application

const PORT = 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})



/*app.listen() is a method in Express.js used to start a server that listens
 for incoming client connections on the specified port.
 It binds and listens for connections on a specified host and port, creating an
 HTTP server behind the scenes. */