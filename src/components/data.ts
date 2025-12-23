import type { SysLogEvent } from '@/types'
import { v4 as uuidv4 } from 'uuid'

export const APPS = ['AUTH', 'PAYMENT', 'UI', 'NOTIFICATIONS', 'API']
const MESSAGES = [
  'Failed to login user',
  'Payment processing is slow',
  'User opened dashboard',
  'Email sent successfully',
  'Unexpected error occurred',
  'Data synced with server',
]

const TYPES: SysLogEvent['type'][] = ['error', 'warning', 'info']

export function generateSysLogs(count: number): SysLogEvent[] {
  const logs: SysLogEvent[] = []

  for (let i = 0; i < count; i++) {
    const type = TYPES[Math.floor(Math.random() * TYPES.length)]
    const app = APPS[Math.floor(Math.random() * APPS.length)]
    const message = MESSAGES[Math.floor(Math.random() * MESSAGES.length)]

    logs.push({
      uniqueId: uuidv4(),
      type,
      app,
      message,
      date: new Date(Date.now() - Math.floor(Math.random() * 1000 * 60 * 60 * 24)), // случайная дата за последние 24 часа
    })
  }

  return logs
}
