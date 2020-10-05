import React from 'react'
import { Frown } from 'react-feather'
import S from '../stitches.config'
import Text from './Text'

const ErrorMainContainer = S.styled('main', {
    backgroundColor: '$lightGray',
    minHeight: '100vh',
})

const ErrorInnerContainer = S.styled('div', {
    margin: '0 auto',
    paddingTop: '11%',
    width: 400,
    textAlign: 'center',
})

const ErrorText = S.styled(Text, {
    color: '$dimGray',
    margin: '$2 0 $6',
})

const ErrorInfo: React.FC<{ description: string }> = ({
    description,
    children,
}) => {
    return (
        <ErrorMainContainer>
            <ErrorInnerContainer>
                <Frown color="#959da5" size={50} />
                <ErrorText>{description}</ErrorText>
                {children}
            </ErrorInnerContainer>
        </ErrorMainContainer>
    )
}

export default ErrorInfo
