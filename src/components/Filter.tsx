import { useState } from 'react'
import { styled } from 'styled-components'
import { Container } from '@/theme'
import Dropdown from '@/components/DropDown.tsx'

type FilterProps = {
  apps: string[]
  onFilter: (filters: { message: string; app: string; date: string }) => void
}

export default function Filter({ apps, onFilter }: FilterProps) {
  const [message, setMessage] = useState('')
  const [app, setApp] = useState('')
  const [date, setDate] = useState('')

  const handleChange = (field: 'message' | 'app' | 'date', value: string) => {
    if (field === 'message') setMessage(value)
    if (field === 'app') setApp(value)
    if (field === 'date') setDate(value)
    onFilter({ message, app, date, [field]: value })
  }

  return (
    <Root>
      <Container>
        <Row>
          <Input
            value={message}
            onChange={(e) => handleChange('message', e.target.value)}
            placeholder="Фильтр сообщений"
          />
          <Dropdown options={apps} value={app} onChange={(val) => handleChange('app', val)} />
          <DateInput type={'date'} value={date} onChange={(e) => handleChange('date', e.target.value)} />
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
