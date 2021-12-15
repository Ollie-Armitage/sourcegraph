import { useEffect, useState } from 'react'
import { ObservableInput } from 'rxjs'

import { ErrorLike } from '@sourcegraph/shared/src/util/errors'

import { useLazyParallelRequest } from '../../../hooks/use-parallel-requests/use-parallel-request'

export interface UseInsightDataResult<T> {
    data: T | undefined
    error: ErrorLike | undefined
    loading: boolean
    isVisible: boolean
    query: (request: () => ObservableInput<T>) => void
}

export function useInsightData<D>(
    request: () => ObservableInput<D>,
    reference: React.RefObject<HTMLElement>
): UseInsightDataResult<D> {
    const { data, loading, error, query } = useLazyParallelRequest<D>()
    const [isVisible, setVisibility] = useState<boolean>(false)
    const [hasIntersected, setHasIntersected] = useState<boolean>(false)

    useEffect(() => {
        if (hasIntersected) {
            // eslint-disable-next-line @typescript-eslint/unbound-method
            const { unsubscribe } = query(request)

            return unsubscribe
        }

        return
    }, [hasIntersected, query, request])

    useEffect(() => {
        const element = reference.current

        if (!element) {
            return
        }

        function handleIntersection(entries: IntersectionObserverEntry[]): void {
            const [entry] = entries

            setVisibility(entry.isIntersecting)

            if (entry.isIntersecting) {
                setHasIntersected(true)
            }
        }

        const observer = new IntersectionObserver(handleIntersection)

        observer.observe(reference.current)

        return () => observer.unobserve(element)
    }, [reference])

    return { data, loading, error, isVisible, query }
}
