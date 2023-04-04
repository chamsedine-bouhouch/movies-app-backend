// See https://github.com/typicode/json-server#module
const jsonServer = require('json-server')
const auth = require('json-server-auth')
const cors = require('cors')

const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

server.use(cors())
server.use(jsonServer.bodyParser)
server.use(middlewares)

server.db = router.db

// Add this before server.use(router)
// server.use(jsonServer.rewriter({
//     '/api/*': '/$1',
//     '/blog/:resource/:id/show': '/:resource/:id'
// }))
server.use(auth)
server.use(router)
// server.listen(3001, () => {
//     console.log('JSON Server is running')
// })
const PORT = 8000

server.listen(PORT, () => {
  console.log(`JSON Server is running on http://localhost:${PORT}`)
})

// Export the Server API
module.exports = server
