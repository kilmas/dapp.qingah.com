import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { AnimatedRoute } from 'react-router-transition';
import Home from './pages/Home';
import Category from './pages/Category';
import ScrollToTop from './components/ScrollToTop/';
import QrCode from './pages/QrCode';
import './App.css';

function App() {
  return (
    <Router>
      <ScrollToTop>
        <div className="App">
          <Route exact path="/" component={Home} />
          <Route exact path="/qrcode" component={QrCode} />
          <div className={'animated-wrapper-rule'}>
            <AnimatedRoute
              path="/eth/:category"
              component={Category}
              atEnter={{ offset: 50, opacity: 0 }}
              atLeave={{ offset: 150, opacity: 1 }}
              atActive={{ offset: 0, opacity: 1 }}
              mapStyles={(styles) => ({
                transform: `translateX(${styles.offset}%)`,
              })}
            />
          </div>
        </div>
      </ScrollToTop>
    </Router>
  );
}

export default App;
