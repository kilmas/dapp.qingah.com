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
  componentDidMount() {
    trackEvent(ANALYTICS_EVENT_OPTS.IMPRESSION);
  }

  render() {
    return (
      <div>
        <Header />
        <Autocomplete />
        <FeaturedDappsCarousel />
        <Tabs>
          <div label="Favorites">
            <Favorites />
          </div>
          <div label="OKChain">
            <CommonDapps dapps={[
              { name: 'OKLink 区块浏览器', img: 'http://static.fowallet.net/1.0/fileProc/5a964114341f5e469f5acdde2272bc8e', url: "http://www.oklink.com" },
              { name: 'TokenView', img: 'http://static.fowallet.net/1.0/fileProc/0f4ccc76d30b51c48eed54ced7be6d4e', url: "https://tokenview.com/" },
              { name: 'OpenDex', img: 'https://oss.bafang.com/blockchain/icon/eth/ETH_OKB.jpg', url: "https://www.okex.me/dex-test/spot/trade" }]} />
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
        {isMobile.any() ? <TakeATour /> : ''}
      </div>
    );
  }
}