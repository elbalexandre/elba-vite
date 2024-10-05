import type { NextRequest } from 'next/server'
import { ElbaConfig } from "../config"

export type Route = (req: NextRequest, config: ElbaConfig) => Promise<Response> | Response

