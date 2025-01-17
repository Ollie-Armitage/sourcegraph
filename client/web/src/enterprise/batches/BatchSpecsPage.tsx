import MapSearchIcon from 'mdi-react/MapSearchIcon'
import React, { useCallback, useMemo } from 'react'
import { RouteComponentProps } from 'react-router'

import { ThemeProps } from '@sourcegraph/shared/src/theme'
import {
    FilteredConnection,
    FilteredConnectionQueryArguments,
} from '@sourcegraph/web/src/components/FilteredConnection'
import { Container, PageHeader } from '@sourcegraph/wildcard'

import { PageTitle } from '../../components/PageTitle'
import { BatchSpecListFields, Scalars } from '../../graphql-operations'

import {
    queryBatchSpecs as _queryBatchSpecs,
    queryBatchChangeBatchSpecs as _queryBatchChangeBatchSpecs,
} from './backend'
import { BatchSpecNode, BatchSpecNodeProps } from './BatchSpecNode'
import styles from './BatchSpecsPage.module.scss'

export interface BatchSpecsPageProps extends Omit<BatchSpecListProps, 'currentSpecID'> {}

export const BatchSpecsPage: React.FunctionComponent<BatchSpecsPageProps> = props => (
    <>
        <PageTitle title="Batch specs" />
        <PageHeader
            headingElement="h2"
            path={[{ text: 'Batch specs' }]}
            description="All batch specs that currently exist."
            className="mb-3"
        />
        <Container>
            <BatchSpecList {...props} />
        </Container>
    </>
)

export interface BatchChangeBatchSpecListProps extends Omit<BatchSpecListProps, 'queryBatchSpecs'> {
    batchChangeID: Scalars['ID']
    currentSpecID: Scalars['ID']
    queryBatchChangeBatchSpecs?: typeof _queryBatchChangeBatchSpecs
}

export const BatchChangeBatchSpecList: React.FunctionComponent<BatchChangeBatchSpecListProps> = ({
    history,
    location,
    batchChangeID,
    currentSpecID,
    isLightTheme,
    queryBatchChangeBatchSpecs = _queryBatchChangeBatchSpecs,
    now,
}) => {
    const query = useMemo(() => queryBatchChangeBatchSpecs(batchChangeID), [queryBatchChangeBatchSpecs, batchChangeID])

    return (
        <BatchSpecList
            history={history}
            location={location}
            queryBatchSpecs={query}
            isLightTheme={isLightTheme}
            currentSpecID={currentSpecID}
            now={now}
        />
    )
}

export interface BatchSpecListProps extends ThemeProps, Pick<RouteComponentProps, 'history' | 'location'> {
    currentSpecID?: Scalars['ID']
    queryBatchSpecs?: typeof _queryBatchSpecs
    /** For testing purposes only. Sets the current date */
    now?: () => Date
}

export const BatchSpecList: React.FunctionComponent<BatchSpecListProps> = ({
    history,
    location,
    currentSpecID,
    isLightTheme,
    queryBatchSpecs = _queryBatchSpecs,
    now,
}) => {
    const query = useCallback(
        (args: FilteredConnectionQueryArguments) => {
            const passedArguments = {
                first: args.first ?? null,
                after: args.after ?? null,
            }
            return queryBatchSpecs(passedArguments)
        },
        [queryBatchSpecs]
    )
    return (
        <FilteredConnection<BatchSpecListFields, Omit<BatchSpecNodeProps, 'node'>>
            history={history}
            location={location}
            nodeComponent={BatchSpecNode}
            nodeComponentProps={{ currentSpecID, isLightTheme, now }}
            queryConnection={query}
            hideSearch={true}
            defaultFirst={20}
            noun="batch spec"
            pluralNoun="batch specs"
            listClassName={styles.specsGrid}
            listComponent="div"
            withCenteredSummary={true}
            headComponent={Header}
            cursorPaging={true}
            noSummaryIfAllNodesVisible={true}
            emptyElement={<EmptyList />}
        />
    )
}

const Header: React.FunctionComponent<{}> = () => (
    <>
        <span className="d-none d-md-block" />
        <h5 className="p-2 d-none d-md-block text-uppercase text-center text-nowrap">State</h5>
        <h5 className="p-2 d-none d-md-block text-uppercase text-nowrap">Batch spec</h5>
        <h5 className="d-none d-md-block text-uppercase text-center text-nowrap">Execution time</h5>
    </>
)

const EmptyList: React.FunctionComponent<{}> = () => (
    <div className="text-muted text-center mb-3 w-100">
        <MapSearchIcon className="icon" />
        <div className="pt-2">No batch specs have been created so far.</div>
    </div>
)
