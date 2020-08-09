import React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { trackEvent, ANALYTICS_EVENT_OPTS } from '../../utils/analytics';
import { makeStyles } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
  horizontal: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  vertical: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
  tabPanel: {
    flex: 1
  }
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && children}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};



function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

const acTab = localStorage.getItem('activeTab') || 0

const TabsComponent = ({ children, activeTab = parseInt(acTab), orientation = "horizontal", ...props }) => {
  const classes = useStyles()
  const [state, setState] = React.useState({
    activeTab
  })
  const onTabSelected = (tab, label) => {
    localStorage.setItem('activeTab', tab)
    setState({ activeTab: tab });
    trackEvent(ANALYTICS_EVENT_OPTS.CLICKS_HOMEPAGE_TAB, { 'Tab': label });
  }
  return <div className={classes[orientation]}>
    <Tabs
      value={state.activeTab}
      onChange={(event, newValue) => {
        onTabSelected(newValue, children[newValue].props.label)
      }}
      orientation={orientation}
      indicatorColor="primary"
      textColor="primary"
      variant="scrollable"
      scrollButtons="auto"
      aria-label="scrollable auto tabs example"
    >
      {React.Children.map(children, (child, index) => {
        const { label } = child.props;
        return (
          <Tab
            key={index.toString()}
            label={label}
            {...a11yProps(label)}
          />
        );
      })}
    </Tabs>
    {React.Children.map(children, (child, index) => {
      return <TabPanel value={state.activeTab} index={index} key={index.toString()} className={classes.tabPanel}>
        {child.props.children}
      </TabPanel>
    })}
  </div>
}

TabsComponent.propTypes = {
  children: PropTypes.instanceOf(Array).isRequired,
  orientation: PropTypes.oneOf(['horizontal', 'vertical']),
}


export default TabsComponent