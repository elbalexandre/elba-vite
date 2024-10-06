import { uuid, text, timestamp, pgTable, PgColumnBuilderBase,  } from 'drizzle-orm/pg-core';
import { InferSelectModel } from 'drizzle-orm'

export const organisationsTableColumns = {
  id: uuid('id').primaryKey(),
  region: text('region').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
} as const

export type TableColumns = Record<Exclude<string, keyof typeof organisationsTableColumns>, PgColumnBuilderBase>

export type Organisation<T extends TableColumns> = InferSelectModel<ReturnType<typeof pgTable<'organisations', typeof organisationsTableColumns & T>>>

export type ElbaSchema = {
  organisations: ReturnType<typeof pgTable<'organisations', typeof organisationsTableColumns>>
}
