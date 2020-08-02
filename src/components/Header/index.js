import React from 'react'
import BgImage from '../../images/mobileBanner.png';
// import LogoWordmark from '../../images/starting.png';
import './index.css';

const Header = () => {
  return (
    <div className={'header'}>
      <img src={BgImage} className={'header bg-img'} alt={'background'} />
    </div>
  );
}

export default Header