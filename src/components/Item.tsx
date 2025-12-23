import { styled } from 'styled-components'
import type { SysLogEvent } from '@/types'
import { parseDate } from '@/utils'

type Props = SysLogEvent

export default function Item({ type, app, message, date }: Props) {
  return (
    <Root $type={type}>
      <Header>
        <App>{app}</App>
        <DateText>{parseDate(date)}</DateText>
      </Header>
      <Message>{message}</Message>
    </Root>
  )
}

const Root = styled.div<{ $type: SysLogEvent['type'] }>`
  width: 100%;
  max-width: 600px;
  padding: 12px 16px;
  border-radius: 8px;
  background-color: ${({ $type }) => ($type === 'error' ? '#ffe5e5' : $type === 'warning' ? '#fff4e5' : '#e5f0ff')};
  border-left: 6px solid ${({ $type }) => ($type === 'error' ? '#ff4d4f' : $type === 'warning' ? '#faad14' : '#1890ff')};
  display: flex;
  flex-direction: column;
  gap: 6px;
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const App = styled.span`
  font-weight: 600;
  font-size: 14px;
  color: #333;
`

const DateText = styled.span`
  font-size: 12px;
  color: #888;
`

const Message = styled.div`
  font-size: 14px;
  color: #333;
  word-break: break-word;
`
