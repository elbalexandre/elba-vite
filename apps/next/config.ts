import { ElbaConfig } from '@elba/next-elba/config'

export const config: ElbaConfig = {
  name: 'my-saas',
  features: {
    users: {
      deleteUsers: () => Promise.resolve(),
      getUsersPage: () => Promise.resolve({ users: [], nextCursor: null })
    }
  }
}
