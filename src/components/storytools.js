import React from 'react';
import { action } from '@kadira/storybook';
import actionsMaker from "../actions"

function toplevelWrapper(story) {
  return <div id="app" className="site-wrapper">
    {story()}
  </div>
}

var actions = {};
Object.keys(actionsMaker()).forEach(key => actions[key] = action(key));

export {toplevelWrapper, actions};
