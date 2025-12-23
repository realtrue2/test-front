export type SysLogEvent = {
  uniqueId: string // Уникальный идентификатор, генерируется случайным образом, можно использовать uuid
  type: 'error' | 'warning' | 'info' // Тип события
  date: Date // Дата события
  app: string // Код приложения
  message: string
}

export type LogsFilter = {
  message: string
  app: string
  dateFrom: string
  dateTo: string
}
