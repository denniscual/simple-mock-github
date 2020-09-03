import S from '../stitches.config'
import Button from './Button'

const PillButton = S.styled(Button, {
    borderRadius: '9999px',
})

PillButton.displayName = 'PillButton'

export default PillButton
