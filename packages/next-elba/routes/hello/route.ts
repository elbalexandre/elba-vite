import { Route } from "../types";

export const hello: Route = (request) => {
  const name = request.nextUrl.searchParams.get('name') ?? 'World'
  return new Response(`Hello ${name}!`)
}
