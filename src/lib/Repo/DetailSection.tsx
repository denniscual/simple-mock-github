import React from 'react'
import { Headings } from '../../components'
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
            <Headings.H5>{title}</Headings.H5>
            {children}
        </Section>
    )
}

export default DetailSection
