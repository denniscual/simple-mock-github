import React from 'react'
import S from '../../stitches.config'

const Section = S.styled('section', {
    py: '$4',
    display: 'grid',
    rowGap: '$4',
    borderBottom: '$1 solid $gray2',
})

const DetailSection: React.FC<{ title: React.ReactNode }> = ({
    title,
    children,
}) => {
    return (
        <Section>
            {title}
            {children}
        </Section>
    )
}

export default DetailSection
