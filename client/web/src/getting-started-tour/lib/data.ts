export interface GettingStartedItem {
    id: string
    label: string
    completedPercentage?: number
    children: (Pick<GettingStartedItem, 'id' | 'label'> & { to: string; completed?: boolean })[]
}

export const GETTING_STARTED_ITEMS: GettingStartedItem[] = [
    {
        id: 'search-use-cases',
        label: 'Code search use cases',
        children: [
            {
                id: 'diffs-for-removed-code',
                label: 'Search diffs for removed code',
                to: '/search?q=repo:github%5C.com/sourcegraph/sourcegraph%24+something+type:diff&patternType=literal', // TODO: update
            },
            {
                id: 'changes-in-commits',
                label: 'Find changes in commits',
                to: '#TODO:',
            },
            {
                id: 'symbols-containing-string',
                label: 'Find symbols containing a string',
                to: '#TODO:',
            },
        ],
    },
    {
        id: 'more-from-code-intel',
        label: 'Getting more from code intel',
        children: [
            {
                id: 'find-references',
                label: 'Scope a change: Find references',
                to: '#TODO:',
            },
            {
                id: 'go-to-definition',
                label: 'Find the origin: Go to definition',
                to: '#TODO:',
            },
        ],
    },
    {
        id: 'improving-workflow',
        label: 'Tools for improving workflow',
        children: [
            {
                id: 'bext',
                label: 'Install the browser extention',
                to: 'https://docs.sourcegraph.com/integration/editor',
            },
            {
                id: 'ide',
                label: 'Install the editor extention',
                to: 'https://docs.sourcegraph.com/integration/browser_extension',
            },
        ],
    },
]
