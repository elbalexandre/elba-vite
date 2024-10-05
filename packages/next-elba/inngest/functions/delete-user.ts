import { ElbaContext } from "../../types";

export const deleteUsers = ({ inngest, config }: ElbaContext) => inngest.createFunction(
  { id: "delete-users" },
  { event: `${config.name}/users.delete.requested` },
  async ({ event, step }) => {
    const { userId } = event.data
    await step.run('delete-user', () => config.features.users.deleteUsers(userId))
  },
);