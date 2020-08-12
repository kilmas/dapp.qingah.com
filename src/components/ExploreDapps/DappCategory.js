import React, { Component } from 'react'
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { trackEvent, ANALYTICS_EVENT_OPTS } from '../../utils/analytics';

import './DappCategory.css';

export default class DappCategory extends Component {
  track = () => {
    trackEvent(ANALYTICS_EVENT_OPTS.CLICKS_DAPP_CATEGORY, {
      'Category': this.props.data.name,
    });
  }

  render() {
    const { name, icon, color } = this.props.data;
    const url = `/eth/${name.toLowerCase().replace(" ", "-")}`;

    return (
      <Link
        className={'dapp-category'}
        to={url}
        onClick={this.track}
      >
        <FontAwesomeIcon
          className={'dapp-category-icon'}
          icon={icon}
          color={color}
        />
        <span className={'dapp-category-name'} >{name}</span>
      </Link>
    );
  }
}