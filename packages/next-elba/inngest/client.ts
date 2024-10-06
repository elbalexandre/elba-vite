import { EventSchemas, Inngest } from "inngest";
import { ElbaConfig } from "../config";

type AddSchemasPrefix<T extends EventSchemas<any>> = T extends EventSchemas<infer D>
  ? EventSchemas<{
    [K in keyof D as K extends string ? `${string}/${K}` : never]:
      K extends string
        // in addition of key we need to override name as well
        ? Omit<D[K], 'name'> & { name: `${string}/${K}` }
        : never
    }>
  : never

const schemas = new EventSchemas().fromRecord<{
  'users.sync.requested': {
    data: {
      organisationId: string;
      isFirstSync: boolean;
      syncStartedAt: number;
      cursor: string | null;
    };
  };
  'users.delete.requested': {
    data: {
      organisationId: string;
      userId: string;
    };
  };
  'token.refresh.requested': {
    data: {
      organisationId: string,
      expiresAt: string
    }
  }
}>()

export type ElbaInngest = Inngest<{ id: string, schemas: AddSchemasPrefix<typeof schemas> }>

export const createInngest = (config: ElbaConfig): ElbaInngest => {
  return new Inngest({
    id: config.name,
    schemas
  })
}
