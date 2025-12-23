import { useEffect, useRef, useState } from 'react'
import { styled } from 'styled-components'
import { Container } from '@/theme'
import type { LogsFilter, SysLogEvent } from '@/types'
import Item from './Item'
import { APPS, generateSysLogs } from '@/components/data.ts'
import { loadLogs } from '@/utils'
import Loader from '@/components/Loader.tsx'
import Filter from '@/components/Filter.tsx'
import { useDebounce } from '@uidotdev/usehooks'

const EXTRA_HEIGHT = 3
const LOGS_COUNT = 10000
const ITEM_HEIGHT = 62 + 15

const data = generateSysLogs(LOGS_COUNT)

export default function Main() {
  const rootRef = useRef<HTMLDivElement>(null)
  const [visibleCount, setVisibleCount] = useState(0)
  const [list, setList] = useState<SysLogEvent[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [resizeTimeout, setResizeTimeout] = useState<NodeJS.Timeout>()
  const [filter, setFilter] = useState<LogsFilter>({ app: '', dateFrom: '', dateTo: '', message: '' })
  const end = useRef<boolean>(false)
  const offset = useRef<number>(0)
  const debouncedFilter = useDebounce(filter, 300)

  const handleLoadMore = async (data: SysLogEvent[], limit: number, loadFilter: LogsFilter) => {
    if (end.current) return
    setIsLoading(true)
    const { logs: newLogs, nextOffset } = await loadLogs(data, offset.current, limit, loadFilter)
    if (newLogs.length === 0) {
      end.current = true
    }
    setList((prev) => [...prev, ...newLogs])
    offset.current = nextOffset
    setIsLoading(false)
  }

  const handleFilterChange = (newFilter: LogsFilter) => {
    end.current = false
    setFilter(newFilter)
  }

  useEffect(() => {
    if (!visibleCount) return
    offset.current = 0
    setList([])

    handleLoadMore(data, visibleCount, debouncedFilter)
  }, [debouncedFilter])

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
    if (visibleCount > 0 && !list.length && !isLoading) handleLoadMore(data, visibleCount, filter)
  }, [visibleCount])

  const handleScroll = () => {
    if (!rootRef.current) return

    const { scrollTop, scrollHeight, clientHeight } = rootRef.current

    if (!isLoading && scrollTop + clientHeight >= scrollHeight - 5 && list.length < data.length) {
      handleLoadMore(data, visibleCount, filter)
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
