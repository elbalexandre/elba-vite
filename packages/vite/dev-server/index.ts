import { Hono } from 'hono'
import deleteUsersRoute from '../routes/webhooks/users/delete-users'

const app = new Hono()

app.get('/', (c) => {
  return c.render('hello')
})


app.get('/api/webhooks/users/delete-users', (c) => {
  if (!config.features.users.revokable) {
    throw new Error('Endpoint is not implemented: features.users.revokable is false')
  }
  return deleteUsersRoute(c.req.raw)
})

export default app