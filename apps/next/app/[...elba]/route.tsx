import { config } from '@/config'
import { elba } from '@elba/next-elba/router'

export const runtime = 'edge'

export const { GET, DELETE, POST } = elba(config)
