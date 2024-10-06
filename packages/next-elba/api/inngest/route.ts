
import { serve } from "inngest/next";
import { InngestFunction } from 'inngest'
import { syncUsers } from "../../inngest/functions/users/sync-users";
import { deleteUser } from "../../inngest/functions/users/delete-user";
import { ElbaContext } from "../../types";
import { scheduleUsersSyncs } from "../../inngest/functions/users/schedule-users-syncs";

export const createInngestRoutes = (context: ElbaContext) => {
  const { inngest, config } = context
  const functions: InngestFunction.Any[] = [
    scheduleUsersSyncs(context),
    syncUsers(context)
  ]

  if (config.users.deleteUser) {
    functions.push(deleteUser(context))
  }

  return serve({
    client: inngest,
    functions,
  });
}