import React from 'react';
import { motion } from 'framer-motion'
import { Typography } from '@mui/material';

const Product = () => {
  return (
    <div className="flex flex-col gap-[40px]"
      style={{ flex: 1, padding: "25px" }}>
      <h1
        style={{
          fontFamily: "sans-serif",
          fontSize: "20px",
          fontWeight: "bold",
        }}
      >
        Integrations
      </h1>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.1 } }}
        className="flex flex-1 items-center justify-center h-full"
      >
        <Typography color="text.secondary" variant="h5">
          There are no records!
        </Typography>
      </motion.div>
    </div>
  )
}

export default Product