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
          <div label="FO">
            <TabsDapps />
          </div>
          <div label="ETH">
            <ExploreDapps />
          </div>
        </Tabs>
        {isMobile.any() ? <TakeATour /> : ''}
      </div>
    );
  }
}