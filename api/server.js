// See https://github.com/typicode/json-server#module
const jsonServer = require('json-server')
const auth = require('json-server-auth')

const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults({noCors:false})
server.use(middlewares)

server.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'https://vuetify-movies-app.vercel.app')
    res.header('Access-Control-Allow-Headers', '*')
    next()
  })

server.db = router.db

// Add this before server.use(router)
// server.use(jsonServer.rewriter({
//     '/api/*': '/$1',
//     '/blog/:resource/:id/show': '/:resource/:id'
// }))
server.use(auth)
server.use(router)
server.listen(3001, () => {
    console.log('JSON Server is running')
})

// Export the Server API
module.exports = server
