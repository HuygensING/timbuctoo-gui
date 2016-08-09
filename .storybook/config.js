import { configure, addDecorator } from '@kadira/storybook';


import "../src/stylus/index.styl";
const req = require.context('../src/components', true, /\.story\.js$/)

function loadStories() {
  req.keys().forEach(req)
}

configure(loadStories, module);
