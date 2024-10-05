import { ElbaConfig } from "./config";
import { ElbaInngest } from "./inngest/client";

export type ElbaContext = {
  config: ElbaConfig,
  inngest: ElbaInngest
  // todo: add db client
}
