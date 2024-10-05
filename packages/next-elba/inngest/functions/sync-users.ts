import { ElbaContext } from "../../types";

export const syncUsers = ({ inngest, config }: ElbaContext) => inngest.createFunction(
  { id: "sync-users" },
  { event: `${config.name}/users.sync.requested` },
  async ({ event, step }) => {
    // todo: implement
  },
);