import { Meta, Story } from '@storybook/react'
import React from 'react'

import { BrandedStory } from '@sourcegraph/branded/src/components/BrandedStory'
import { Toggle } from '@sourcegraph/branded/src/components/Toggle'
import { Link } from '@sourcegraph/shared/src/components/Link'
import webStyles from '@sourcegraph/web/src/SourcegraphWebApp.scss'

import { Button, Grid } from '..'

import { Card, CardBody, CardHeader, CardSubtitle, CardText, CardTitle, CardList } from '.'

const config: Meta = {
    title: 'wildcard/Card',

    decorators: [
        story => (
            <BrandedStory styles={webStyles}>{() => <div className="container mt-3">{story()}</div>}</BrandedStory>
        ),
    ],

    parameters: {
        component: Card,
        design: {
            type: 'figma',
            name: 'Figma',
            url: 'https://www.figma.com/file/NIsN34NH7lPu04olBzddTw/Wildcard-Design-System?node-id=1172%3A285',
        },
    },
}

export default config

export const Simple: Story = () => (
    <>
        <h1>Cards</h1>
        <p>
            A card is a flexible and extensible content container. It includes options for headers and footers, a wide
            variety of content, contextual background colors, and powerful display options.{' '}
        </p>

        <h2>Examples</h2>

        <Grid className="mb-3" columnCount={1}>
            <Card>
                <CardBody>This is some text within a card body.</CardBody>
            </Card>

            <Card>
                <CardBody>
                    <CardTitle>Card title</CardTitle>
                    <CardSubtitle>Card subtitle</CardSubtitle>
                    <CardText>
                        Some quick example text to build on the card title and make up the bulk of the card's content.
                    </CardText>
                    <Button variant="primary">Do something</Button>
                </CardBody>
            </Card>

            <Card>
                <CardHeader>Featured</CardHeader>
                <CardBody>
                    <CardTitle>Special title treatment</CardTitle>
                    <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                    <Button variant="primary">Do something</Button>
                </CardBody>
            </Card>
        </Grid>
    </>
)

const cardItem = (
    <Card variant="interactive">
        <CardBody className="d-flex justify-content-between align-items-center">
            <div className="d-flex flex-column">
                <CardTitle className="mb-0">Watch for secrets in new commits</CardTitle>
                <CardSubtitle>New search result → Sends email notifications, delivers webhook</CardSubtitle>
            </div>
            <div className="d-flex align-items-center">
                <Toggle onClick={() => {}} value={true} className="mr-3" disabled={false} />
                <Link to="">Edit</Link>
            </div>
        </CardBody>
    </Card>
)

export const InteractiveCard: Story = () => (
    <>
        <h2>Interactive Cards</h2>
        {cardItem}

        <h3 className="mt-4">Cards List</h3>

        <CardList>
            {cardItem}
            {cardItem}
            {cardItem}
            {cardItem}
        </CardList>
    </>
)
