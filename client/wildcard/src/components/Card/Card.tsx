import classNames from 'classnames'
import React from 'react'

import styles from './Card.module.scss'
import { CARD_VARIANTS } from './constants'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * Interactive variant, shows blue border on hover and focus
     */
    variant?: typeof CARD_VARIANTS[number]
}

/**
 * Card Element
 */
export const Card: React.FunctionComponent<CardProps> = ({
    children,
    className,
    variant = 'default',
    ...attributes
}) => (
    <div
        className={classNames(styles.card, className, variant === 'interactive' && styles.cardInteractive)}
        {...attributes}
    >
        {children}
    </div>
)
