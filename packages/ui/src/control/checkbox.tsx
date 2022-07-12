import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import {CheckIcon} from '@radix-ui/react-icons'

import {styled} from 'theme'

const StyledCheckbox = styled(CheckboxPrimitive.Root, {
  all: 'unset',
  backgroundColor: 'white',
  width: '$5',
  height: '$5',
  borderRadius: '$1',
  borderColor: '$gray300',
  borderWidth: '2px',
  borderStyle: 'solid',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  // boxShadow: `0 2px 10px ${blackA.blackA7}`,
  '&:hover': {
    backgroundColor: '$gray100',
  },
  '&:focus': {
    borderColor: '$gray500',
  },
})

const StyledIndicator = styled(CheckboxPrimitive.Indicator, {
  color: '$text',
})

type Props = {
  id: string
  checked: boolean
  onChange: (checked: boolean) => void
}
export function Checkbox({id, checked, onChange}: Props) {
  return (
    <StyledCheckbox checked={checked} onCheckedChange={onChange} id={id}>
      <StyledIndicator>
        <CheckIcon />
      </StyledIndicator>
    </StyledCheckbox>
  )
}
