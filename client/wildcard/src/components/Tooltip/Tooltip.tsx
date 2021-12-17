import classNames from 'classnames'
import * as Popper from 'popper.js'
import React, { useImperativeHandle, ReactNode } from 'react'
import { Tooltip as BootstrapTooltip } from 'reactstrap'

import styles from './Tooltip.module.scss'
import { useTooltipState } from './useTooltipState'
import { getTooltipStyle } from './utils'

interface TooltipProps {
    className?: string
    children?: ReactNode
}

interface WithReference extends TooltipProps {
    ref?: React.ForwardedRef<any>
}

interface TooltipHandle {
    forceUpdate: () => void
}

export const TooltipMain: React.FunctionComponent<WithReference> = React.forwardRef<TooltipHandle, WithReference>(
    ({ className }, reference) => {
        const { forceUpdate, ...state } = useTooltipState()

        useImperativeHandle(reference, () => ({ forceUpdate }))

        return state.subject && state.content ? (
            <BootstrapTooltip
                // Set key prop to work around a bug where quickly mousing between 2 elements with tooltips
                // displays the 2nd element's tooltip as still pointing to the first.
                key={state.subjectSeq}
                isOpen={true}
                target={state.subject}
                placement={(state.placement ?? 'auto') as Popper.Placement}
                // in order to add our own placement classes we need to set the popperClassNames
                // here is where bootstrap injects it's placement classes such as 'bs-tooltip-auto' automatically.
                popperClassName={classNames(
                    styles.tooltip,
                    className,
                    getTooltipStyle((state.placement ?? 'auto') as Popper.Placement)
                )}
                innerClassName={styles.tooltipInner}
                // This is a workaround to an issue with tooltips in reactstrap that causes the entire page to freeze.
                // Remove when https://github.com/reactstrap/reactstrap/issues/1482 is fixed.
                modifiers={{
                    flip: {
                        enabled: false,
                    },
                    preventOverflow: {
                        boundariesElement: 'window',
                    },
                }}
                delay={state.delay}
            >
                {state.content}
            </BootstrapTooltip>
        ) : null
    }
)

// Class based implementation is necessary to access static instance methods / variables.
// such as forceUpdate defined below.
export class Tooltip extends React.Component<TooltipProps> {
    private ref

    constructor(props: TooltipProps) {
        super(props)
        this.ref = React.createRef<TooltipHandle>()
    }

    private static INSTANCE: Tooltip | undefined

    public static forceUpdate(): void {
        const instance = Tooltip.INSTANCE
        if (instance && !!instance.ref.current) {
            instance.ref.current.forceUpdate()
        }
    }

    public componentDidMount(): void {
        Tooltip.INSTANCE = this
    }

    public componentWillUnmount(): void {
        Tooltip.INSTANCE = undefined
    }

    public render(): React.ReactFragment | null {
        return <TooltipMain {...this.props} ref={this.ref} />
    }
}
