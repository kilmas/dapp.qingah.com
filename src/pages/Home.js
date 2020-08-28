import React, { Component } from 'react'
import Header from '../components/Header/';
import Tabs from '../components/Tabs/';
import Autocomplete from '../components/Autocomplete/';
import FeaturedDappsCarousel from '../components/FeaturedDappsCarousel/';
import ExploreDapps from '../components/ExploreDapps/';
import Favorites from '../components/Favorites/';
import TakeATour from '../components/TakeATour/';
import { trackEvent, ANALYTICS_EVENT_OPTS } from '../utils/analytics';
import TabsDapps from '../components/TabsDapps';
import { Box } from '@material-ui/core';
import CommonDapps from '../components/CommonDapps';
import { getData } from '../utils/resquest';

const isMobile = {
  Android: function () {
    return navigator.userAgent.match(/Android/i);
  },
  BlackBerry: function () {
    return navigator.userAgent.match(/BlackBerry/i);
  },
  iOS: function () {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  Opera: function () {
    return navigator.userAgent.match(/Opera Mini/i);
  },
  Windows: function () {
    return navigator.userAgent.match(/IEMobile/i);
  },
  any: function () {
    return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
  }
};

export default class Home extends Component {


  constructor(props) {
    super(props)
    this.state = {
      iosApprove: true
    }
  }

  componentDidMount = async () => {
    trackEvent(ANALYTICS_EVENT_OPTS.IMPRESSION);
    let iosApprove = false
    if (isMobile.iOS()) {
      try {
        const data = await getData(`./data.json?t=${new Date().getTime()}`)
        iosApprove = data.iosApprove
      } catch (e) {
        iosApprove = true
        console.warn(e)
      }
    }
    this.setState({ iosApprove })
  }

  render() {
    return (
      <div>
        <Header />
        <Autocomplete />
        {this.state.iosApprove ? <h1 style={{ paddingTop: 50, textAlign: 'center' }}>Welcome to Here!</h1> : <React.Fragment>
          <FeaturedDappsCarousel />
          <Tabs>
            <div label="Favorites">
              <Favorites />
            </div>
            <div label="OKChain">
              <CommonDapps dapps={[
                { name: 'OKLink 区块浏览器', img: 'http://static.fowallet.net/1.0/fileProc/5a964114341f5e469f5acdde2272bc8e', url: "http://www.oklink.com" },
                { name: 'TokenView', img: 'http://static.fowallet.net/1.0/fileProc/0f4ccc76d30b51c48eed54ced7be6d4e', url: "https://tokenview.com/" },
                { name: 'OpenDex', img: './OKB.jpg', url: "https://www.okex.me/dex-test/spot/trade" }]} />
            </div>
            <div label="FO">
              <TabsDapps />
            </div>
            <div label="ETH">
              <ExploreDapps />
            </div>
            <div label="BTC">
              <Box p={3}>Coming soon</Box>
            </div>
            <div label="BTM">
              <Box p={3}>Coming soon</Box>
            </div>
          </Tabs>
        </React.Fragment>}
        {isMobile.any() ? <TakeATour /> : ''}
      </div>
    );
  }
}