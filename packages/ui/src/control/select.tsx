import {useMemo} from 'react'
import * as SelectPrimitive from '@radix-ui/react-select'
import {CheckIcon, ChevronDownIcon} from '@radix-ui/react-icons'

import {styled} from 'theme'

export const Root = SelectPrimitive.Root

export function Trigger() {
  return (
    <StyledTrigger>
      <SelectPrimitive.Value />
      <SelectPrimitive.Icon>
        <ChevronDownIcon />
      </SelectPrimitive.Icon>
    </StyledTrigger>
  )
}

type SelectContentItem = {
  title: string
}
export function Content({
  title,
  items,
}: {
  title?: string
  items: Array<SelectContentItem>
}) {
  const content = useMemo(() => {
    return items.map((item) => {
      return (
        <StyledItem key={item.title} value={item.title}>
          <SelectPrimitive.ItemText>{item.title}</SelectPrimitive.ItemText>
          <StyledItemIndicator>
            <CheckIcon />
          </StyledItemIndicator>
        </StyledItem>
      )
    })
  }, [items])
  return (
    <StyledContent>
      <StyledViewport>
        <SelectPrimitive.Group>
          {title && <StyledLabel>{title}</StyledLabel>}
          {content}
        </SelectPrimitive.Group>
      </StyledViewport>
    </StyledContent>
  )
}

const StyledTrigger = styled(SelectPrimitive.SelectTrigger, {
  all: 'unset',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '$1',
  borderColor: '$transparent',
  borderWidth: '2px',
  borderStyle: 'solid',
  padding: '0 $5',
  gap: '$2',
  height: '$7',
  letterSpacing: '-0.2px',
  backgroundColor: '$white',
  color: '$text',
  '&:hover': {
    backgroundColor: '$gray100',
  },
  '&:focus': {
    borderColor: '$gray400',
  },
})

const StyledContent = styled(SelectPrimitive.Content, {
  overflow: 'hidden',
  backgroundColor: 'white',
  borderRadius: '$1',
  boxShadow:
    '0px 10px 38px -10px rgba(22, 23, 24, 0.35), 0px 10px 20px -15px rgba(22, 23, 24, 0.2)',
})

const StyledViewport = styled(SelectPrimitive.Viewport, {
  padding: '$2',
})

const StyledLabel = styled(SelectPrimitive.Label, {
  padding: '$3 $7 $5',
  fontSize: '$s',
  lineHeight: 1,
  color: '$text',
  height: '$6',
})

const StyledItem = styled(SelectPrimitive.Item, {
  unset: 'all',
  fontSize: '$m',
  lineHeight: 1,
  color: '$text',
  height: '$6',
  padding: '0 $7',
  position: 'relative',
  userSelect: 'none',
  display: 'flex',
  alignItems: 'center',

  '&:focus': {
    backgroundColor: '$gray700',
    color: '$white',
  },
})

const StyledItemIndicator = styled(SelectPrimitive.ItemIndicator, {
  position: 'absolute',
  left: 0,
  width: '$6',
  height: '$6',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
})
