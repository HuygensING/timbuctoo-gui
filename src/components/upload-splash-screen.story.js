import React from 'react';
import { storiesOf } from '@kadira/storybook';
import {toplevelWrapper, actions} from "./storytools"

import UploadSplashScreen from './upload-splash-screen';

storiesOf('upload-splash-screen', module)
  .addDecorator(toplevelWrapper)
  .add('logged out', function () {
    var data = {
      userdata: {
      },
      importData: {
        isUploading: false
      }
    };
    return <UploadSplashScreen {...data} {...actions} />
  })
  .add('logged in', function () {
    var data = {
      userdata: {
        userId: "some string"
      },
      importData: {
        isUploading: false
      }
    };
    return <UploadSplashScreen {...data} {...actions} />
  })
  .add('uploading', function () {
    var data = {
      userdata: {
        userId: "some string"
      },
      importData: {
        isUploading: true
      }
    };
    return <UploadSplashScreen {...data} {...actions} />
  });
