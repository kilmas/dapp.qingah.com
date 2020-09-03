import React, { Component } from 'react'
import { getHost } from '../../utils/browser';
import Dapp from '../Dapp';
import './index.css';
import { Box } from '@material-ui/core';

export default class Favorites extends Component {
  state = {
    favorites: []
  }

  componentDidMount() {
    if (window.__mmFavorites) {
      this.setState({ favorites: window.__mmFavorites.reverse() });
    }

    window.addEventListener('message', ({ data }) => {
      if (data === 'updateFavorites') {
        if (window.__mmFavorites) {
          this.setState({ favorites: window.__mmFavorites.reverse() });
        }
      }
    });

  }

  onClose = async (url) => {
    const { favorites } = await window.ethereum.send('metamask_removeFavorite', [url]);
    this.setState({ favorites: favorites.reverse() });
  }

  renderFavorites() {
    return (
      <div className={'favorites'}>
        <Box m="1em">
          {
            this.state.favorites.map((dapp, i) => (
              <Dapp
                data={{
                  ...dapp,
                  image: `https://api.faviconkit.com/${getHost(dapp.url)}/64`,
                  description: null
                }}
                key={`fav-${dapp.url}`}
                size={'small'}
                closable
                onClose={this.onClose}
                position={i}
              />
            ))
          }
        </Box>
      </div>
    );
  }

  renderEmpty() {
    return (
      <div className={'favorites-empty'}>
        <p>You have no favorites yet</p>
      </div>
    );
  }

  render() {
    if (!this.state.favorites || !this.state.favorites.length) {
      return this.renderEmpty();
    }

    return this.renderFavorites()
  }
}
