import { ElbaConfig } from '@elba/next-elba/config'

export const config: ElbaConfig = {
  name: 'my-saas',
  features: {
    users: {
      revokable: true,
      getUsersPage: () => Promise.resolve({ users: [], nextCursor: null })
    }
  }
}
