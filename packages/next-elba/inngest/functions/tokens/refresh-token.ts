import { eq } from "drizzle-orm";
import { ElbaContext } from "../../../types";

export const refreshToken = ({ inngest, config, db, schema }: ElbaContext) => inngest.createFunction(
  { id: 'refresh-token' },
  { event: `${config.name}/token.refresh.requested` },
  async ({ event, step }) => {
    const { expiresAt, organisationId } = event.data

    await step.sleepUntil('wait-for-token-expires', new Date(expiresAt))

    const [organisation] = await db.select().from(schema.organisations).where(eq(schema.organisations.id, organisationId))

    const nextExpiresAt = await step.run('refresh-token', async () => {
      const {
        expiresAt: nextExpiresAt,
        ...updatedOrganisation 
      } = await config.oauth.refresh(organisation)

      await db
        .update(schema.organisations)
        .set(updatedOrganisation)
        .where(eq(schema.organisations.id, organisationId))

      return nextExpiresAt
    })

    await step.sendEvent('send-refresh-token', {
      name: `${config.name}/token.refresh.requested`,
      data: {
        organisationId,
        expiresAt: nextExpiresAt
      }
    })
  },
);