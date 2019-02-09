import * as React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { linkTo } from '@storybook/addon-links'
import { Button } from './Button'
// import { CenterDecorator } from '../src/decorators/CenterDecorator'
// @ts-ignore
import { Welcome } from '@storybook/react/demo'

storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')}/>)

storiesOf('Test', module)
  .add('Intro', () => <h1>Hello Button</h1>)

storiesOf('Button', module)
// .addDecorator(CenterDecorator)
//   .addParameters({options: {sortStoriesByKind: true}})
//   .addDecorator(story => <div style={{textAlign: 'center'}}>{story()}</div>)
  .add('with text', () => <Button label='string' onClick={action('clicked')}>Hello Button</Button>)
  .add('with some emoji', () => <Button label='string' onClick={action('clicked')}>😀 😎 👍 💯</Button>)
