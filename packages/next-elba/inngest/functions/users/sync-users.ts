import { eq } from "drizzle-orm";
import { ElbaContext } from "../../../types";

export const syncUsers = ({ inngest, config, db, schema }: ElbaContext) => inngest.createFunction(
  { id: 'sync-users' },
  { event: `${config.name}/users.sync.requested` },
  async ({ event, step }) => {
    const { cursor, organisationId } = event.data
    const [organisation] = await db.select().from(schema.organisations).where(eq(schema.organisations.id, organisationId))

    const { users, nextCursor } = await step.run('sync-users-page', () => config.users.getUsersPage(organisation, cursor))

    if (users.length > 0) {
      await step.run('send-users', () => {
        // TODO: send users
      })
    }

    if (nextCursor) {
      await step.sendEvent('sync-next-page', {
        name: `${config.name}/users.sync.requested`,
        data: {
          ...event.data,
          cursor: nextCursor
        }
      })
      return { status: 'ongoing' }
    }

    await step.run('delete-users', () => {
      // TODO: send users
    })

    return { status: 'completed' }
  },
);