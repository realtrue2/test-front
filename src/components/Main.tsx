import { useEffect, useRef, useState } from 'react'
import { styled } from 'styled-components'
import { Container } from '@/theme'
import type { LogsFilter, SysLogEvent } from '@/types'
import Item from './Item'
import { APPS, generateSysLogs } from '@/components/data.ts'
import { loadLogs } from '@/utils'
import Loader from '@/components/Loader.tsx'
import Filter from '@/components/Filter.tsx'

const EXTRA_HEIGHT = 3
const LOGS_COUNT = 100
const ITEM_HEIGHT = 62 + 15

const data = generateSysLogs(LOGS_COUNT)

export default function Main() {
  const rootRef = useRef<HTMLDivElement>(null)
  const [visibleCount, setVisibleCount] = useState(0)
  const [offset, setOffset] = useState(0)
  const [list, setList] = useState<SysLogEvent[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [resizeTimeout, setResizeTimeout] = useState<NodeJS.Timeout>()
  const [filter, setFilter] = useState<LogsFilter>({})
  const [end, setEnd] = useState<boolean>(false)

  const handleLoadMore = async (data: SysLogEvent[], offset: number, limit: number, loadFilter: LogsFilter) => {
    if (end) return
    setIsLoading(true)
    const { logs: newLogs, nextOffset } = await loadLogs(data, offset, limit, loadFilter)
    if (newLogs.length === 0) {
      setEnd(true)
    }
    setList((prev) => [...prev, ...newLogs])
    setOffset(nextOffset)
    setIsLoading(false)
  }

  const handleFilterChange = (newFilter: LogsFilter) => {
    setEnd(false)
    const filtered = list.filter((log) => {
      return (
        (!newFilter.message || log.message.includes(newFilter.message)) &&
        (!newFilter.app || log.app === newFilter.app) &&
        (!newFilter.date || log.date.toISOString().slice(0, 10) === newFilter.date)
      )
    })
    setList(filtered)
    setFilter(newFilter)
    if (filtered.length < visibleCount) {
      handleLoadMore(data, offset, visibleCount - filtered.length, newFilter)
    }
  }

  const containerHeightHandler = () => {
    if (!rootRef.current) return

    const height = rootRef.current.clientHeight
    const val = Math.floor(height / ITEM_HEIGHT) + EXTRA_HEIGHT
    setVisibleCount((prev) => (prev === val ? prev : val))
  }

  useEffect(() => {
    const resizeHandler = () => {
      if (resizeTimeout) {
        clearTimeout(resizeTimeout)
      }
      setResizeTimeout(() =>
        setTimeout(() => {
          containerHeightHandler()
        }, 200)
      )
    }
    containerHeightHandler()
    window.addEventListener('resize', resizeHandler)
    return () => window.removeEventListener('resize', resizeHandler)
  }, [])

  useEffect(() => {
    if (visibleCount > 0 && !list.length && !isLoading) handleLoadMore(data, 0, visibleCount, filter)
  }, [visibleCount])

  const handleScroll = () => {
    if (!rootRef.current) return

    const { scrollTop, scrollHeight, clientHeight } = rootRef.current

    if (!isLoading && scrollTop + clientHeight >= scrollHeight - 5 && list.length < data.length) {
      handleLoadMore(data, offset, visibleCount, filter)
    }
  }

  return (
    <Root ref={rootRef} onScroll={handleScroll}>
      <Filter apps={APPS} onFilter={handleFilterChange} />
      <Container>
        <List>
          {list.map((e) => (
            <Item key={e.uniqueId} {...e} />
          ))}
        </List>
        {isLoading && <Loader />}
      </Container>
    </Root>
  )
}

const Root = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background: #fefdfb;
  padding: 86px 0 25px;
  overflow: auto;
`

const List = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 15px;
  align-items: center;
`
