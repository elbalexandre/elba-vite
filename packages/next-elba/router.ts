import { NextRequest  } from "next/server"
import { ElbaConfig } from "./config"
import { hello } from "./api/hello/route"
import { Route } from "./api/types"
import { deleteUsers } from "./api/webhooks/elba/users/delete-users/route"
import { createInngest } from "./inngest/client"
import { createInngestRoutes} from "./api/inngest/route"

type HTTPMethod = 'GET' | 'POST' | 'DELETE'

const routes: Record<`${HTTPMethod} ${string}`, Route> = {
  'GET /api/hello': hello,
  'POST /api/webhooks/elba/users/delete-users': deleteUsers
}

const handler = (request: NextRequest, config: ElbaConfig) => {
  const inngest = createInngest(config)
  const context = { config, inngest }

  const method = request.method as HTTPMethod
  const { pathname } = request.nextUrl

  if (pathname === '/api/inngest') {
    const inngestRoutes = createInngestRoutes(context)
    const inngestRoute = inngestRoutes[method]
    return inngestRoute(request)
  }

  const handler = routes[`${method} ${pathname}`]

  if (!handler) {
    return new Response(null, { status: 404 })
  }

  return handler(request, context)
}


export const elba = (config: ElbaConfig): Record<HTTPMethod, typeof handler> => ({
  GET: req => handler(req, config),
  POST: req => handler(req, config),
  DELETE: req => handler(req, config),
})

