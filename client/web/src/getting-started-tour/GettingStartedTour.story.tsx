import { Meta, DecoratorFn } from '@storybook/react'
import React from 'react'

import { WebStory } from '../components/WebStory'

import { GettingStartedTour } from './GettingStartedTour'

const decorator: DecoratorFn = story => <WebStory>{() => <div className="container mt-3">{story()}</div>}</WebStory>

const config: Meta = {
    title: 'web/GettingStartedTour',
    decorators: [decorator],
    parameters: {
        component: GettingStartedTour,
    },
}

export default config

export const Light: React.FunctionComponent = () => <GettingStartedTour />

export const Dark: React.FunctionComponent = () => <GettingStartedTour />
