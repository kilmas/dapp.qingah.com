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
import { getData, postData } from '../utils/resquest';

export const isMobile = {
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
  isWeiXin() {
    const ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) === 'micromessenger') {
      return true;
    } else {
      return false;
    }
  },
  any: function () {
    return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
  }
};


let localDapps = localStorage.getItem('foDapps')
if (localDapps) {
  localDapps = JSON.parse(localDapps)
}

export default class Home extends Component {


  constructor(props) {
    super(props)
    this.state = {
      iosApprove: true,
      foDapps: localDapps
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
    this.fetchData()
    this.fetchTronData()
    this.fetchEosData()
    // const [foDapps, setFoDapps] = React.useState(localDapps || {})

  }

  async fetchData() {
    const foDappsData = await postData('https://dapp.fo/1.0/app/tagdapps/getAllDapp', {
      page: 1,
      pageSize: 100
    })
    const dapps = {}
    foDappsData.forEach(item => {
      item.tags.forEach(tag => {
        const { tag: { name } } = tag
        const pItem = {
          id: item.id,
          url: item.url,
          img: `http://static.fowallet.net/1.0/fileProc/${item.img}`,
          title: item.name,
          subtitle: item.description,
        }
        if (dapps[name]) {
          dapps[name].push(pItem)
        } else {
          dapps[name] = [pItem]
        }
      })
    });
    // setFoDapps(dapps)
    this.setState({ foDapps: dapps })
    if (!localDapps) localDapps = dapps
    localStorage.setItem('foDapps', JSON.stringify(dapps))
  }

  async getDappByReview(platform) {
    const { results } = await getData(`https://www.dapp.review/api/dapps?search=&page=1&page_size=100&ordering=-usd_24h&platform=${platform}&lang=zh`)
    const dapps = {}
    results.forEach(item => {
      const { category } = item
      const pItem = {
        id: item.id,
        url: item.dapp_website,
        img: item.media.logo,
        title: item.title,
        subtitle: item.description_short
      }
      if (dapps[category]) {
        dapps[category].push(pItem)
      } else {
        dapps[category] = [pItem]
      }
    });
    return dapps
  }
  async fetchTronData() {
    const dapps = await this.getDappByReview('tron')
    this.setState({ trxDapps: dapps })
  }

  async fetchEosData() {
    const dapps = await this.getDappByReview('eos')
    this.setState({ eosDapps: dapps })
  }

  render() {
    const { foDapps, trxDapps, eosDapps } = this.state
    return (
      <div>
        <Header />
        <Autocomplete />
        {this.state.iosApprove ? <h1 style={{ paddingTop: 50, textAlign: 'center' }}>Welcome to Here!</h1> : <React.Fragment>
          <FeaturedDappsCarousel />
          <Tabs name="home">
            <div label="Favorites">
              <Favorites />
            </div>
            <div label="FO">
              <TabsDapps dapps={foDapps} name="fo" />
            </div>
            <div label="ETH">
              <ExploreDapps />
            </div>
            <div label="EOS">
              <TabsDapps dapps={eosDapps} name="eos"  />
            </div>
            <div label="TRON">
              <TabsDapps dapps={trxDapps} name="tron" />
            </div>
            <div label="OKChain">
              <CommonDapps dapps={[
                { name: 'OKLink 区块浏览器', img: 'http://static.fowallet.net/1.0/fileProc/5a964114341f5e469f5acdde2272bc8e', url: "http://www.oklink.com" },
                { name: 'TokenView', img: 'http://static.fowallet.net/1.0/fileProc/0f4ccc76d30b51c48eed54ced7be6d4e', url: "https://tokenview.com/" },
                { name: 'OpenDex', img: './OKB.jpg', url: "https://www.okex.me/dex-test/spot/trade" }]} />
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