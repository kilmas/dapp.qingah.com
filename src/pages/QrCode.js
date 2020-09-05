import React, { Component } from 'react'
import { isMobile } from './Home'
import { Box } from '@material-ui/core'

export default class Home extends Component {
  componentDidMount = async () => {
    if (isMobile.isWeiXin()) {
      return
    } if (isMobile.iOS()) {
      window.location.href = 'https://testflight.apple.com/join/uWaNXNtj'
    } else if (isMobile.Android()) {
      window.location.href = 'https://dapp.bitewd.com/app-universal-release.apk'
    }
  }

  render() {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="500px">
        <h1>请复制链接到浏览器打开</h1>
      </Box>
    );
  }
}