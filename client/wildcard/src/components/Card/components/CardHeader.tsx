import classNames from 'classnames'
import React from 'react'

import { ForwardReferenceComponent } from '../../..'

import styles from './CardHeader.module.scss'

interface CardHeaderProps {
    /**
     * Used to change the element that is rendered.
     */
    as?: React.ElementType
}

export const CardHeader = React.forwardRef(
    ({ as: Component = 'div', children, className, ...attributes }, reference) => (
        <Component ref={reference} className={classNames(styles.cardHeader, className)} {...attributes}>
            {children}
        </Component>
    )
) as ForwardReferenceComponent<'div', CardHeaderProps>
