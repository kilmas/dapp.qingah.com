import React, { Component } from 'react'
import { isMobile } from './Home'

export default class Home extends Component {
  componentDidMount = async () => {
    if (isMobile.iOS()) {
      window.location.href = 'https://testflight.apple.com/join/uWaNXNtj'
    } else if (isMobile.Android()) {
      window.location.href = 'https://github.com/kilmas/QHWallet/releases'
    }
  }

  render() {
    return (
      <div>
       
      </div>
    );
  }
}