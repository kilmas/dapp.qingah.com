import React from 'react'
import { Link } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import { postData } from '../../utils/resquest';
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
              <img src={`http://static.fowallet.net/1.0/fileProc/${tile.img}`} alt={tile.title} />
            </div>
            <GridListTileBar
              title={tile.name}
              // subtitle={<span>{tile.name}</span>}
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}

let localDapps = localStorage.getItem('foDapps')
if (localDapps) {
  localDapps = JSON.parse(localDapps)
}
const TabsDapps = () => {

  const [foDapps, setFoDapps] = React.useState(localDapps || {})
  React.useEffect(() => {
    async function fetchData() {
      const foDappsData = await postData('https://dapp.fo/1.0/app/tagdapps/getAllDapp', {
        page: 1,
        pageSize: 100
      })
      const dapps = {}
      foDappsData.forEach(item => {
        item.tags.forEach(tag => {
          const { tag: { name } } = tag
          if (dapps[name]) {
            dapps[name].push(item)
          } else {
            dapps[name] = [item]
          }
        })
      });
      setFoDapps(dapps)
      if(!localDapps) localDapps = dapps
      localStorage.setItem('foDapps', JSON.stringify(dapps))
    }
    fetchData();
  }, [])
  return (<Tabs orientation="vertical">
      {Object.keys(foDapps).map(
        key => <div label={key} key={key}>
          <TitlebarGridList data={foDapps[key]} />
        </div>
      )}
  </Tabs>
  )
}

export default TabsDapps