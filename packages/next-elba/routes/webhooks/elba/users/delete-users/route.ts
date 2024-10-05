import { Route } from '../../../../types';

export const deleteUsers: Route = (request, config) => {
  if (!config.features.users.revokable) {
    return new Response(null, { status: 404 })
  }

  return new Response(null)
}