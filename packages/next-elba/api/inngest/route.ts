
import { serve } from "inngest/next";
import { InngestFunction } from 'inngest'
import { syncUsers } from "../../inngest/functions/sync-users";
import { deleteUsers } from "../../inngest/functions/delete-user";
import { ElbaContext } from "../../types";

export const createInngestRoutes = (context: ElbaContext) => {
  const { inngest, config } = context
  const functions: InngestFunction.Any[] = [
    syncUsers(context)
  ]

  if (config.features.users.deleteUsers) {
    functions.push(deleteUsers(context))
  }

  return serve({
    client: inngest,
    functions,
  });
}