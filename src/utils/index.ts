import { format } from 'date-fns'
import type { LogsFilter, SysLogEvent } from '@/types'

export const parseDate = (time: Date) => {
  try {
    return format(time, 'MMM dd, yyyy HH:mm:ss')
  } catch (error) {
    console.log(error)
    return
  }
}

export const loadLogs = (
  data: SysLogEvent[],
  offset: number,
  limit: number,
  filter?: LogsFilter
): Promise<{ logs: SysLogEvent[]; nextOffset: number }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const result: SysLogEvent[] = []
      let count = 0
      let i = offset

      for (; i < data.length && count < limit; i++) {
        const log = data[i]

        const matchMessage = filter?.message ? log.message.toLowerCase().includes(filter.message.toLowerCase()) : true
        const matchApp = filter?.app ? log.app === filter.app : true

        const logDate = log.date.toISOString().slice(0, 10)

        const matchDateFrom = filter?.dateFrom ? logDate >= filter.dateFrom : true
        const matchDateTo = filter?.dateTo ? logDate <= filter.dateTo : true

        if (matchMessage && matchApp && matchDateFrom && matchDateTo) {
          result.push(log)
          count++
        }
      }

      resolve({ logs: result, nextOffset: i })
    }, 500)
  })
}
