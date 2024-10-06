import { text } from 'drizzle-orm/pg-core';
import { ElbaConfig } from '@elba/next-elba/config'

const organisationsTableColumns = {
  accessToken: text('access_token').notNull(),
  refreshToken: text('refresh_token').notNull(),
} as const

export const config: ElbaConfig<typeof organisationsTableColumns> = {
  name: 'my-saas',
  database: {
    organisations: organisationsTableColumns
  },
  oauth: {
    installationUrl: 'http://foo.bar/?client_id=1234&client_secret=4321',
    authorize: async () => {
      return {
        accessToken: 'access-token',
        refreshToken: 'refresh-token',
        expiresAt: new Date()
      }
    },
    refresh: async () => {
      return {
        accessToken: 'access-token',
        refreshToken: 'refresh-token',
        expiresAt: new Date()
      }
    }
  },
  users: {
    deleteUser: async (organisation, userId) => {
      const response = await fetch(`http://foo.bar/users/${userId}`, {
        method: 'delete',
        headers: {
          'Authorization': `Bearer ${organisation.accessToken}`
        },
      })

      if (!response.ok || response.status !== 404) {
        throw new Error(`Could not delete user with id=${userId}`)
      }
    },
    getUsersPage: async (organisation, cursor) => {
      const response = await fetch(`http://foo.bar/users?page=${cursor}`, {
        headers: {
          'Authorization': `Bearer ${organisation.accessToken}`
        },
      })

      if (!response.ok) {
        throw new Error('Could not retrieve users page')
      }

      return {
        users: [],
        nextCursor: null
      }
    }
  }
}
