import { ElbaConfig } from '@elba/vite/config'

export const config: ElbaConfig = {
  name: 'saas',
  features: {
    users: {
      revokable: true,
      getUsersPage: () => {
        return Promise.resolve({ users: [{ id: "1"} ], nextCursor: null })
      }
    }
  }
}
