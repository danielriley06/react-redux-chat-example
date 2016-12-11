const http = require('http')
const project = require('../config/project.config')
const appServerConfig = require('../server/main')
const debug = require('debug')('app:bin:dev-server')
const SocketIo = require('socket.io')

const server = http.createServer(appServerConfig)
const io = new SocketIo(server, { path: '/api/chat' })
const socketEvents = require('../server/socketEvents')(io)

server.listen(project.server_port)
debug(`Server is now running at http://localhost:${project.server_port}.`)
