import { Accordion, AccordionButton, AccordionItem, AccordionPanel } from '@reach/accordion'
import classNames from 'classnames'
import ArrowDropDownIcon from 'mdi-react/ArrowDropDownIcon'
import CheckCircleIcon from 'mdi-react/CheckCircleIcon'
import CloseIcon from 'mdi-react/CloseIcon'
import React from 'react'
import { CircularProgressbar } from 'react-circular-progressbar'
import { Link } from 'react-router-dom'

import styles from './GettingStartedTour.module.scss'
import { useGettingStartedTour } from './lib/useGettingStartedTour'

export const GettingStartedTour: React.FunctionComponent<{ className?: string }> = ({ className }) => {
    const { completedCount, totalCount, items, onItemClick, onClose } = useGettingStartedTour()
    const isTourCompleted = completedCount === totalCount

    if (isTourCompleted) {
        return (
            <Card title="Tour complete!" className={className} onClose={onClose}>
                Sign Up / Restart
            </Card>
        )
    }

    return (
        <Card title="Getting started" className={className} onClose={onClose}>
            <GettingStartedActionList
                items={items}
                onItemClick={onItemClick}
                completedCount={completedCount}
                totalCount={totalCount}
            />
        </Card>
    )
}

const Card: React.FunctionComponent<{ onClose: () => void; title: string; className?: string }> = ({
    title,
    children,
    onClose,
    className,
}) => (
    <article className={classNames(styles.container, className)}>
        <div className={styles.innerContainer}>
            <header className={styles.header}>
                <h3 className={classNames(styles.title)}>{title}</h3>
                <CloseIcon onClick={onClose} className="icon-inline" size="1rem" />
            </header>
            {children}
        </div>
    </article>
)

type GettingStartedActionListProps = Pick<
    ReturnType<typeof useGettingStartedTour>,
    'items' | 'onItemClick' | 'completedCount' | 'totalCount'
>

const GettingStartedActionList: React.FunctionComponent<GettingStartedActionListProps> = ({
    items,
    onItemClick,
    completedCount,
    totalCount,
}) => (
    <>
        <hr className={styles.divider} />
        <Accordion collapsible={true} multiple={true}>
            {items.map(({ id, label, children, completedPercentage }) => (
                <AccordionItem key={id}>
                    <AccordionButton as="h3">
                        <span className={styles.arrowIconContainer}>
                            <ArrowDropDownIcon size="1rem" />
                        </span>
                        <span className={styles.label}>{label}</span>
                        <div className={styles.progressBar}>
                            <CircularProgressbar strokeWidth={12} value={completedPercentage} />
                        </div>
                    </AccordionButton>
                    <AccordionPanel>
                        {children.map(item => (
                            <h4 key={item.id}>
                                <Link
                                    to={item.to}
                                    onClick={onItemClick(item.id)}
                                    className={classNames(styles.label, styles.link)}
                                >
                                    {item.label}
                                </Link>
                                <CheckCircleIcon
                                    className={classNames(
                                        'icon-inline',
                                        item.completed ? 'text-success' : 'text-muted'
                                    )}
                                    size="1rem"
                                />
                            </h4>
                        ))}
                    </AccordionPanel>
                </AccordionItem>
            ))}
        </Accordion>
        <footer>
            <CheckCircleIcon className="icon-inline text-success" size="1rem" />
            <span className={styles.footerText}>
                {completedCount} of {totalCount}
            </span>
        </footer>
    </>
)
