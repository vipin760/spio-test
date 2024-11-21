import Button from '@mui/material/Button'
import Input from '@mui/material/Input'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import { motion } from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import FuseSvgIcon from '@fuse/core/FuseSvgIcon'
import { selectUser } from 'app/store/userSlice'
import { selectProductsSearchText } from '../store/productsSlice'
// import {
//   selectProductsSearchText,
//   setProductsSearchText,
// } from '../../../store/productsSlice'

function ProductsHeader(props) {

  const user = useSelector(selectUser)
  const dispatch = useDispatch()
  


  return (
    <div className="flex flex-col sm:flex-row sm:items-start space-y-16 sm:space-y-0 flex-1 w-full items-center justify-between py-32 px-24 md:px-32">
      <Typography
        component={motion.span}
        initial={{ x: -20 }}
        animate={{ x: 0, transition: { delay: 0.2 } }}
        delay={300}
        className="text-20 md:text-20 font-extrabold tracking-tight"
      >
        Virtual No Mapping
      </Typography>

      <div className="flex flex-col w-full sm:flex-wrap sm:gap-20 sm:w-auto sm:flex-row space-y-16 sm:space-y-0 flex-1 items-center justify-end space-x-8">
        <Paper
          component={motion.div}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
          className="flex items-center w-full sm:max-w-256 space-x-8 px-16 rounded-full border-1 shadow-0"
        >
          <FuseSvgIcon color="disabled">heroicons-solid:search</FuseSvgIcon>

          <Input
            placeholder="Search User"
            className="flex flex-1"
            disableUnderline
            fullWidth
            // value={searchText}
            inputProps={{
              'aria-label': 'Search',
            }}
            onChange={(ev) => dispatch(setProductsSearchText(ev))}
          />
        </Paper>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0, transition: { delay: 0.2 } }}
        >
          <Button
            className=""
            component={Link}
            to="/virtual_no_mapping/new"
            variant="contained"
            color="secondary"
            startIcon={<FuseSvgIcon>heroicons-outline:plus</FuseSvgIcon>}
          >
            Map Virtual No
          </Button>
        </motion.div>
      </div>
    </div>
  )
}

export default ProductsHeader
