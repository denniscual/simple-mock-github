import React from 'react'
import convert from 'htmr'
import 'github-markdown-css'

/**
 * TODO: We need to handle the ref. We need to wrap the Component/render
 * function to React.forwardRef to forward the ref to the dom element.
 *
 * A Component which takes an `html` string and turn it into a Github Markdown.
 * Note that Component takes html not a markdown string. For better result,
 * use Github flavored markdown api.
 *
 */
export default function Markdown<U extends keyof JSX.IntrinsicElements>({
    as,
    html,
    ...otherProps
}: { as: U; html: string } & React.ComponentPropsWithRef<U>) {
    const stringMarkdownEl = React.useMemo(() => convert(html), [html])
    return React.createElement(
        as,
        {
            className: 'markdown-body',
            ...otherProps,
        },
        <>
            {stringMarkdownEl}
            {otherProps.children}
        </>
    )
}
