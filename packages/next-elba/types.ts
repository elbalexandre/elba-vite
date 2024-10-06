import { ElbaConfig } from "./config";
import { ElbaDb } from "./database/client";
import { ElbaSchema } from "./database/schema";
import { ElbaInngest } from "./inngest/client";

export type ElbaContext = {
  config: ElbaConfig,
  inngest: ElbaInngest
  db: ElbaDb,
  schema: ElbaSchema
}
