import { NextRequest  } from "next/server"
import { ElbaConfig } from "../config"
import { hello } from "../routes/hello/route"
import { Route } from "../routes/types"
import { deleteUsers } from "../routes/webhooks/elba/users/delete-users/route"

type HTTPMethod = 'GET' | 'POST' | 'DELETE'

const routes: Record<`${HTTPMethod} ${string}`, Route> = {
  'GET /api/hello': hello,
  'POST /api/webhooks/elba/users/delete-users': deleteUsers
}

const handler = (request: NextRequest, config: ElbaConfig) => {
  const method = request.method as HTTPMethod
  const { pathname } = request.nextUrl

  const handler = routes[`${method} ${pathname}`]

  if (!handler) {
    return new Response(null, { status: 404 })
  }

  return handler(request, config)
}

export const elba = (config: ElbaConfig): Record<HTTPMethod, Route> => ({
  GET: req => handler(req, config),
  POST: req => handler(req, config),
  DELETE: req => handler(req, config),
})

