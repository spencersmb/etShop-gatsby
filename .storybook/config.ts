import { configure, addDecorator } from '@storybook/react'
import { withOptions } from '@storybook/addon-options'
// automatically import all files ending in *.stories.tsx
const req = require.context('../src', true, /.stories.tsx$/);

function loadStories() {
  req.keys().forEach(req);
}

// https://github.com/storybooks/storybook/tree/master/addons/options#using-per-story-options
addDecorator(
  withOptions({
    name: 'etShop',
    sortStoriesByKind: true,
    // theme: themes.dark,
  })
)

configure(loadStories, module)
