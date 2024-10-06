import { Organisation, TableColumns } from "./database/schema";

export type ElbaConfig<T extends TableColumns = {}>= {
  name: string,
  database: {
    organisations: T
  };
  // TODO
  oauth?: {
    installationUrl: string,
    authorize: () => Promise<Partial<Organisation<T>> & { expiresAt: Date }>,
    refresh: (organisation: Organisation<T>) => Promise<Partial<Organisation<T>> & { expiresAt: Date }>,
  },
  users: {
    getUsersPage: (organisation: Organisation<T>, cursor: string | null) => Promise<{ nextCursor: string | null, users: { id: string }[] }>,
    deleteUser?: (organisation: Organisation<T>, userId: string) => Promise<void>
  }
}