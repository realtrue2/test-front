import { useState } from 'react'
import { styled } from 'styled-components'
import { Container } from '@/theme'
import Dropdown from '@/components/DropDown'

type FilterProps = {
  apps: string[]
  onFilter: (filters: { message: string; app: string; dateFrom: string; dateTo: string }) => void
}

export default function Filter({ apps, onFilter }: FilterProps) {
  const [message, setMessage] = useState('')
  const [app, setApp] = useState('')
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')

  const emit = (
    next?: Partial<{
      message: string
      app: string
      dateFrom: string
      dateTo: string
    }>
  ) => {
    onFilter({
      message,
      app,
      dateFrom,
      dateTo,
      ...next,
    })
  }

  return (
    <Root>
      <Container>
        <Row>
          <Input
            value={message}
            placeholder="Фильтр сообщений"
            onChange={(e) => {
              setMessage(e.target.value)
              emit({ message: e.target.value })
            }}
          />

          <Dropdown
            options={apps}
            value={app}
            onChange={(val) => {
              setApp(val)
              emit({ app: val })
            }}
          />

          <DateInput
            type="date"
            value={dateFrom}
            max={dateTo || undefined}
            onChange={(e) => {
              const val = e.target.value
              setDateFrom(val)
              emit({ dateFrom: val })
            }}
          />

          <DateInput
            type="date"
            value={dateTo}
            min={dateFrom || undefined}
            onChange={(e) => {
              const val = e.target.value
              setDateTo(val)
              emit({ dateTo: val })
            }}
          />
        </Row>
      </Container>
    </Root>
  )
}

const Root = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  padding: 12px 0;
  background: #fff;
  z-index: 10;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`

const Row = styled.div`
  display: flex;
  gap: 16px;
  width: 100%;
`

const Input = styled.input`
  flex: 1;
  padding: 8px 12px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  color: #000;
`

const DateInput = styled.input`
  padding: 8px 12px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  color: #000;
`
