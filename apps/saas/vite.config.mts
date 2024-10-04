import { createElbaViteConfig } from '@elba/vite/vite-config'

export default createElbaViteConfig({
  features: {
    users: {
      revokable: true,
      getUsersPage: () => Promise.resolve({ users: [{ id: "1"} ], nextCursor: null })
    }
  }
})