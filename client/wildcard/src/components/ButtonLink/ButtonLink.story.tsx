import { Meta } from '@storybook/react'
import React from 'react'

import { BrandedStory } from '@sourcegraph/branded/src/components/BrandedStory'
import webStyles from '@sourcegraph/web/src/SourcegraphWebApp.scss'

// TODO: To be update to wildcard Link component
import { AnchorLink, setLinkComponent } from './Link'

import { ButtonLink } from '.'

const Story: Meta = {
    title: 'wildcard/ButtonLink',

    decorators: [
        story => (
            <BrandedStory styles={webStyles}>{() => <div className="container mt-3">{story()}</div>}</BrandedStory>
        ),
    ],

    parameters: {
        component: ButtonLink,
        design: {
            type: 'figma',
            name: 'Figma',
            url: 'https://www.figma.com/file/NIsN34NH7lPu04olBzddTw/Wildcard-Design-System?node-id=908%3A1',
        },
    },
}

export default Story
setLinkComponent(AnchorLink)

export const Simple = () => (
    <>
        <h3>Simple button link</h3>
        <ButtonLink to="#">Click me!</ButtonLink>

        <h3>Disabled button link</h3>
        <ButtonLink className="btn" disabled={true}>
            Disabled button
        </ButtonLink>
        <h3>Button link with undefined to property</h3>
        <ButtonLink>Click me</ButtonLink>
        <h3>Button link with onSelect</h3>
        <ButtonLink onSelect={() => alert('Link button selected')}>Click me</ButtonLink>
    </>
)
