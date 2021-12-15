import { useCallback, useMemo } from 'react'

import { GettingStartedItem, GETTING_STARTED_ITEMS } from './data'

interface UseGettingStartedTour {
    completedCount: number
    totalCount: number
    items: NonNullable<GettingStartedItem>[]
    onItemClick: (id: string) => React.MouseEventHandler<HTMLAnchorElement>
    onClose: () => void
}
const getKey = (id: string): string => `getting_started_tour.${id}`
const isCompleted = (id: string): boolean => !!localStorage.getItem(getKey(id))

export function useGettingStartedTour(): UseGettingStartedTour {
    const onItemClick = useCallback(
        (id: string) => () => {
            localStorage.setItem(getKey(id), 'true')
        },
        []
    )

    const onClose = useCallback(() => {
        alert('clicked')
    }, [])

    const data = useMemo(() => {
        let totalCount = 0
        let completedCount = 0
        const items: GettingStartedItem[] = []

        for (const { children, ...rest } of GETTING_STARTED_ITEMS) {
            let nestedCompletedCount = 0

            const calculatedChildren: GettingStartedItem['children'] = []
            for (const child of children) {
                const isChildCompleted = isCompleted(child.id)

                calculatedChildren.push({ ...child, completed: isChildCompleted })
                if (isChildCompleted) {
                    nestedCompletedCount++
                }

                totalCount++
            }
            completedCount += nestedCompletedCount
            items.push({
                ...rest,
                children: calculatedChildren,
                completedPercentage: Math.round((100 * nestedCompletedCount) / calculatedChildren.length),
            })
        }
        return { totalCount, completedCount, items }
    }, [])

    return { ...data, onItemClick, onClose }
}
