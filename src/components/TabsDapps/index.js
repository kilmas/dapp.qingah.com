import React from 'react'
import { Link } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Tabs from '../Tabs';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: '100%',
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
  imgBox: {
    position: 'relative',
    overflow: 'hidden',
    width: '100%',
    paddingBottom: '100%',
    '& img': {
      width: '100%',
      height: '100%',
      position: 'absolute',
    },
  },
}));

function TitlebarGridList({ data }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <GridList cellHeight="auto" className={classes.gridList}>
        {data.map((tile) => (
          <GridListTile key={tile.id} component={Link} href={tile.url}>
            <div className={classes.imgBox}>
              <img src={`${tile.img}`} alt={tile.title} />
            </div>
            <GridListTileBar
              title={tile.title}
              subtitle={<span>{tile.subtitle}</span>}
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}
const TabsDapps = ({ dapps = {}, name = "" }) => {
  return (<Tabs orientation="vertical" name={name}>
    {Object.keys(dapps).map(
      key => <div label={key} key={key}>
        <TitlebarGridList data={dapps[key]} />
      </div>
    )}
  </Tabs>
  )
}

export default TabsDapps