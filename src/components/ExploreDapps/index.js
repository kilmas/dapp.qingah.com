import React from 'react'
import DappCategory from './DappCategory';
import allDapps from '../../data/all-dapps';
import { Box } from '@material-ui/core';


const ExploreDapps = ({ dapps = allDapps }) => {
  return (
    <Box display="flex" alignContent="center" alignItems="center" flexWrap='wrap' m={3}>
      {
        dapps.map((dapp) => (
          <DappCategory
            data={dapp}
            key={dapp.name}
          />
        ))
      }
    </Box>
  );

}

export default ExploreDapps;