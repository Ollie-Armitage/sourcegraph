import { FilterType, resolveFilter } from '@sourcegraph/shared/src/search/query/filters'
import { scanSearchQuery } from '@sourcegraph/shared/src/search/query/scanner'
import { Filter, Keyword } from '@sourcegraph/shared/src/search/query/token'

const regexCheck = (value: string): boolean => {
    try {
        new RegExp(value)
        return true
    } catch {
        return false
    }
}

export interface Checks {
    isValidRegex: true | false | undefined
    isValidOperator: true | false | undefined
    isValidPatternType: true | false | undefined
    isNotRepo: true | false | undefined
    isNotCommitOrDiff: true | false | undefined
}

export const searchQueryValidator = (value: string, touched: boolean): Checks => {
    if (!touched) {
        return {
            isValidRegex: undefined,
            isValidOperator: undefined,
            isValidPatternType: undefined,
            isNotRepo: undefined,
            isNotCommitOrDiff: undefined,
        }
    }

    const tokens = scanSearchQuery(value)

    if (tokens.type === 'success') {
        const filters = tokens.term.filter(token => token.type === 'filter') as Filter[]
        const keywords = tokens.term.filter(token => token.type === 'keyword') as Keyword[]

        const hasAnd = keywords.some(filter => filter.kind === 'and')
        const hasOr = keywords.some(filter => filter.kind === 'or')

        const hasLiteralPattern = filters.some(
            filter =>
                resolveFilter(filter.field.value)?.type === FilterType.patterntype && filter.value?.value === 'literal'
        )

        const hasStructuralPattern = filters.some(
            filter =>
                resolveFilter(filter.field.value)?.type === FilterType.patterntype &&
                filter.value?.value === 'structural'
        )

        const hasRepo = filters.some(
            filter => resolveFilter(filter.field.value)?.type === FilterType.repo && filter.value
        )

        const hasCommit = filters.some(
            filter => resolveFilter(filter.field.value)?.type === FilterType.type && filter.value?.value === 'commit'
        )

        const hasDiff = filters.some(
            filter => resolveFilter(filter.field.value)?.type === FilterType.type && filter.value?.value === 'diff'
        )

        return {
            isValidRegex: regexCheck(value),
            isValidOperator: !hasAnd && !hasOr,
            isValidPatternType: !hasLiteralPattern && !hasStructuralPattern,
            isNotRepo: !hasRepo,
            isNotCommitOrDiff: !hasCommit && !hasDiff,
        }
    }

    return {
        isValidRegex: false,
        isValidOperator: false,
        isValidPatternType: false,
        isNotRepo: false,
        isNotCommitOrDiff: false,
    }
}
