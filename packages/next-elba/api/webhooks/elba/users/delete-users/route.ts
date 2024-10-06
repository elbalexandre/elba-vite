import { Route } from '../../../../types';

export const deleteUsers: Route = async (request, { config, inngest }) => {
  if (!config.users.deleteUser) {
    return new Response(null, { status: 404 })
  }

  await inngest.send({
    name: `${config.name}/users.delete.requested`,
    data: {
      organisationId: 'foo',
      userId: 'bar'
    }
  })

  return new Response(null)
}
