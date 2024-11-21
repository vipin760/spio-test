import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Automotion from "./Automotion";
import Navbar from "../../Navbar/Navbar";
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
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    console.log({ newValue });
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Navbar
        Component={() => (
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              TabIndicatorProps={{ style: { backgroundColor: "#F30002" } }}
              aria-label="basic tabs example"
            >
              <Tab
                label="Discover"
                {...a11yProps(0)}
                style={{
                  color: value === 0 ? "black" : "gray",
                }}
              />
              <Tab
                label="Feed"
                {...a11yProps(1)}
                style={{
                  color: value === 1 ? "black" : "grey",
                }}
              />
            </Tabs>
          </Box>
        )}
      />

      <Product value={value} index={0}>
        <Automotion />
      </Product>
      <Product value={value} index={1}>
        Item Two
      </Product>
    </Box>
  );
}
