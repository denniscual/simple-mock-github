import S from '../../stitches.config'

const LabelLink = S.styled('a', {
    borderRadius: '$oval',
    border: '$1 solid transparent',
    padding: '0 $2',
    fontSize: '$xs',
    fontWeight: '$medium',
    lineHeight: '18px',
    color: '$black',
    marginRight: '$1',

    '&:last-child': {
        marginRight: 0,
    },
})
LabelLink.displayName = 'LabelLink'

export default LabelLink
