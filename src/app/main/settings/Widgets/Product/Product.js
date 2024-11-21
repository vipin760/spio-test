import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CustomTabPanel from "@mui/material/Box"
import Corousel from '../component/Corousel';
import Navbar from 'src/app/main/Navbar/Navbar';
function Product(props) {
 
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

Product.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    console.log({newValue})
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Navbar Component={()=>(<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example"
              TabIndicatorProps={{ style: { backgroundColor: "#F30002" } }}
              >
          <Tab label="Corousel" {...a11yProps(0)}  style={{
                  color: value === 0 ? "black" : "gray",
                }}/>
          <Tab label="Feed" {...a11yProps(1)}  style={{
                  color: value === 1 ? "black" : "gray",
                }}/>
          <Tab label="Video" {...a11yProps(2)}  style={{
                  color: value === 2 ? "black" : "gray",
                }}/>
          <Tab label="Pop-up" {...a11yProps(3)}  style={{
                  color: value === 3 ? "black" : "gray",
                }}/>
          <Tab label="Badge" {...a11yProps(4)}  style={{
                  color: value === 4 ? "black" : "gray",
                }}/>

        </Tabs>
      </Box>)} />
      <Product value={value} index={0}>
        <Corousel/>
      </Product>
      <Product value={value} index={1}>
        Item Two
      </Product>
      <Product value={value} index={2}>
        Item Three
      </Product>
      <Product value={value} index={3}>
        Item four
      </Product>
      <Product value={value} index={4}>
        Item Five
      </Product>
    </Box>
  );
}