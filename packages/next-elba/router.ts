import { NextRequest  } from "next/server"
import { ElbaConfig } from "./config"
import { createInngest } from "./inngest/client"
import { createDatabase } from "./database/client"
import { TableColumns } from "./database/schema"
import { ElbaContext } from "./types"
// APIs
import { hello } from "./api/hello/route"
import { Route } from "./api/types"
import { createInngestRoutes} from "./api/inngest/route"
import { deleteUsers } from "./api/webhooks/elba/users/delete-users/route"
import { install } from "./api/install/route"

type HTTPMethod = 'GET' | 'POST' | 'DELETE'

const routes: Record<`${HTTPMethod} ${string}`, Route> = {
  'GET /api/hello': hello,
  'GET /install': install,
  'POST /api/webhooks/elba/users/delete-users': deleteUsers
}

const handler = <T extends TableColumns>(request: NextRequest, config: ElbaConfig<T>) => {
  const inngest = createInngest(config)
  const { db, schema } = createDatabase(config)
  const context: ElbaContext = { config, inngest, db, schema }

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


export const elba = <T extends TableColumns>(config: ElbaConfig<T>): Record<HTTPMethod, typeof handler> => ({
  GET: req => handler<T>(req, config),
  POST: req => handler<T>(req, config),
  DELETE: req => handler<T>(req, config),
})

