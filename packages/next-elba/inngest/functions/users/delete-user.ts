import { eq } from "drizzle-orm";
import { ElbaContext } from "../../../types";
import { NonRetriableError } from "inngest";

export const deleteUser = ({ inngest, config, db, schema }: ElbaContext) => inngest.createFunction(
  { id: 'delete-users' },
  { event: `${config.name}/users.delete.requested` },
  async ({ event, step }) => {
    const { userId, organisationId } = event.data
    const [organisation] = await db.select().from(schema.organisations).where(eq(schema.organisations.id, organisationId))

    if (!organisation) {
      throw new NonRetriableError(`Could not retrieve organisation with id=${organisationId}`)
    }

    await step.run('delete-user', () => config.users.deleteUser?.(organisation, userId))
  },
);
