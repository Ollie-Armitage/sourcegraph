// NOTE (@fkling): The use of 'zustand' in this codebase should be considered as
// experimental until we had more time to evaluate this library. General
// application of this library is not recommended at this point.
// It is used here because it solves a very real performance issue
// (see https://github.com/sourcegraph/sourcegraph/issues/21200).
import create from 'zustand'

import { Settings, SettingsCascadeOrError } from '@sourcegraph/shared/src/settings/settings'
import { SearchQueryState, updateQuery } from '@sourcegraph/shared/src/search/searchQueryState'

import { parseSearchURL } from '../search'
import { submitSearch, canSubmitSearch } from '../search/helpers'
import { defaultCaseSensitiveFromSettings } from '../util/settings'

export interface NavbarQueryState extends SearchQueryState {}

export const useNavbarQueryState = create<NavbarQueryState>((set, get) => ({
    queryState: { query: '' },
    searchCaseSensitivity: false,

    setQueryState: queryStateUpdate => {
        if (typeof queryStateUpdate === 'function') {
            set({ queryState: queryStateUpdate(get().queryState) })
        } else {
            set({ queryState: queryStateUpdate })
        }
    },

    submitSearch: (parameters, updates = []) => {
        const {
            queryState: { query },
            searchCaseSensitivity: caseSensitive,
        } = get()
        const updatedQuery = updateQuery(query, updates)
        if (canSubmitSearch(query, parameters.selectedSearchContextSpec)) {
            submitSearch({ ...parameters, query: updatedQuery, caseSensitive })
        }
    },

    setSearchCaseSensitivity: (caseSensitive: boolean) => {
        set({ searchCaseSensitivity: caseSensitive })
    },
}))

/**
 * Update or initialize query state related data from URL search parameters
 */
export function setQueryStateFromURL(urlParameters: string): void {
    // This will be updated with the default in settings when the web app mounts.
    const parsedSearchURL = parseSearchURL(urlParameters)
    if (parsedSearchURL.query) {
        // Only update flags if the URL contains a search query.
        useNavbarQueryState.setState({
            searchCaseSensitivity: parsedSearchURL.caseSensitive,
        })
    }
}

/**
 * Update or initialize query state related data from settings
 */
export function setQueryStateFromSettings(settings: SettingsCascadeOrError<Settings>): void {
    const caseSensitive = defaultCaseSensitiveFromSettings(settings)
    if (caseSensitive) {
        useNavbarQueryState.setState({ searchCaseSensitivity: caseSensitive })
    }
}
