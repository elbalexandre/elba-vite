
export type ElbaConfig = {
  name: string,
  features: {
    users: {
      getUsersPage: (cursor: string | null) => Promise<{ nextCursor: string | null, users: { id: string }[] }>,
      deleteUsers?: (userId: string) => Promise<void>
    }
  }
}