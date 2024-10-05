import type { NextRequest } from 'next/server'
import { ElbaContext } from '../types'


export type Route = (req: NextRequest, context: ElbaContext) => Promise<Response> | Response

