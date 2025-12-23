import { useState } from 'react'
import { styled } from 'styled-components'
import { useClickAway } from '@uidotdev/usehooks'
import React from 'react'

type DropdownProps = {
  options: string[]
  value: string
  onChange: (val: string) => void
}

export default function Dropdown({ options, value, onChange }: DropdownProps) {
  const [open, setOpen] = useState(false)
  const ref = useClickAway(() => setOpen(false)) as React.RefObject<HTMLDivElement>

  const handleSelect = (val: string) => {
    onChange(val)
    setOpen(false)
  }

  return (
    <Wrapper ref={ref}>
      <Selected onClick={() => setOpen(!open)}>{value || 'Все приложения'}</Selected>
      {open && (
        <List>
          <Item onClick={() => handleSelect('')}>Все приложения</Item>
          {options.map((opt) => (
            <Item key={opt} onClick={() => handleSelect(opt)}>
              {opt}
            </Item>
          ))}
        </List>
      )}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: relative;
  width: 200px;
  user-select: none;
`

const Selected = styled.div`
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
  background: #fff;
  color: #000;
`

const List = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 4px;
  background: #fff;
  margin-top: 2px;
  z-index: 100;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  color: #000;
`

const Item = styled.div`
  padding: 8px 12px;
  cursor: pointer;
  &:hover {
    background: #f0f0f0;
  }
`
