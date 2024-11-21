import FuseScrollbars from '@fuse/core/FuseScrollbars'
import _ from '@lodash'
import Checkbox from '@mui/material/Checkbox'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'
import clsx from 'clsx'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import withRouter from '@fuse/core/withRouter'
import FuseLoading from '@fuse/core/FuseLoading'
import FuseSvgIcon from '@fuse/core/FuseSvgIcon'
import {
  getProducts,
  selectBranches,
  selectProductsSearchText,
} from '../store/productsSlice'
import ProductsTableHead from './ProductsTableHead'

function ProductsTable(props) {
  const dispatch = useDispatch()
  const products = useSelector(selectBranches)
  const searchText = useSelector(selectProductsSearchText)

  const [loading, setLoading] = useState(true)
  const [dataFetched, setDataFetched] = useState(false)
  const [selected, setSelected] = useState([])
  const [data, setData] = useState(products)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [totalItems, setTotalItem] = useState(10)
  const [order, setOrder] = useState({
    direction: 'asc',
    id: null,
  })

  const isRefreshList = localStorage.getItem('isRefreshList')

  // console.log("..............", products);


  useEffect(() => {

    if (isRefreshList) {
      localStorage.removeItem('isRefreshList');
      setPage(0)

      dispatch(getProducts()).then(() => setDataFetched(true))
    }

  }, [isRefreshList])

  // useEffect(() => {
  //   var startIndex = page* rowsPerPage;
  //   const params={
  //     startIndex:startIndex,
  //     lastIndex:rowsPerPage-1
  //   }
  //   dispatch(getProducts(params)).then(() => setDataFetched(true))
  // }, [dispatch])

  useEffect(() => {
    var startIndex = page * rowsPerPage;

    var endIndex = Math.min(startIndex + rowsPerPage - 1, totalItems - 1);
    const params = {
      startIndex: startIndex,
      lastIndex: rowsPerPage
    }

    dispatch(getProducts()).then(() => setDataFetched(true))

  }, [page, rowsPerPage])

  useEffect(() => {
    if (dataFetched) {
      setLoading(false)
    }
  }, [data])

  useEffect(() => {
    if (searchText.length !== 0) {
      setData(
        _.filter(products, (item) =>
          item.wifiSurfingPolicyName.toLowerCase().includes(searchText.toLowerCase()) || item.institutionName.toLowerCase().includes(searchText.toLowerCase()) ||
          item.institutionBranchName.toLowerCase().includes(searchText.toLowerCase()) || item?.wifiUpLimitKbps.toString().includes(searchText.toLowerCase()) || item?.wifiDownLimitKbps.toString().includes(searchText.toLowerCase()),
        ),
      )
      setPage(0)
    } else {
      setTotalItem(products[0]?.total)
      setData(products)
    }
  }, [products, searchText])

  function handleRequestSort(event, property) {

    const id = property
    let direction = 'desc'

    if (order.id === property && order.direction === 'desc') {
      direction = 'asc'
    }

    setOrder({
      direction,
      id,
    })

  }

  function handleSelectAllClick(event) {
    if (event.target.checked) {
      setSelected(data.map((n) => n.id))
      return
    }
    setSelected([])
  }

  function handleDeselect() {
    setSelected([])
  }

  function handleClick(item) {
    props.navigate(`/surfing_policies/${item.id}`)
  }

  function handleCheck(event, id) {
    const selectedIndex = selected.indexOf(id)
    let newSelected = []

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      )
    }

    setSelected(newSelected)
  }

  function handleChangePage(event, value) {
    setPage(value)
  }

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(event.target.value)
  }

  const startIndex = page * rowsPerPage;

  if (loading) {
    return (
      <div className="w-full flex items-center justify-center h-full">
        <FuseLoading />
      </div>
    )
  }

  if (data.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.1 } }}
        className="flex flex-1 items-center justify-center h-full"
      >
        <Typography color="text.secondary" variant="h5">
          There are no records!
        </Typography>
      </motion.div>
    )
  }


  // console.log(".................orderBy", orderBy);

  //   console.log("////////////////////////", _.orderBy(
  //     data,
  //     [
  //       (o) => {
  //         switch (order.id) {
  //           case 'categories': {
  //             return o.categories[0]
  //           }
  //           default: {
  //             return o[order.id]
  //           }
  //         }
  //       },
  //     ],
  //     [order.direction],
  //   )
  // );



  return (
    <div className="w-full flex flex-col min-h-full">
      <FuseScrollbars className="grow overflow-x-auto">
        <Table stickyHeader className="min-w-xl" aria-labelledby="tableTitle">
          <ProductsTableHead
            selectedProductIds={selected}
            order={order}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={totalItems}
            onMenuItemClick={handleDeselect}
          />

          <TableBody>
            {_.orderBy(
              data,
              [
                (o) => {
                  switch (order.id) {
                    case 'categories': {
                      return o.categories[0]
                    }
                    default: {
                      return o[order.id]
                    }
                  }
                },
              ],
              [order.direction],
            )
              .map((n, i) => {
                const isSelected = selected.indexOf(n.id) !== -1

                // console.log("................", isSelected);


                return (
                  <TableRow
                    className="h-72 cursor-pointer"
                    hover
                    role="checkbox"
                    aria-checked={isSelected}
                    tabIndex={-1}
                    key={n.id}
                    selected={isSelected}
                    onClick={(event) => handleClick(n)}
                  >
                    <TableCell
                      className="p-4 md:p-16"
                      component="th"
                      scope="row"
                      align="left"
                    >
                      {i + 1 + startIndex}
                    </TableCell>
                    <TableCell
                      className="p-4 md:p-16"
                      component="th"
                      scope="row"
                      align="left"
                    >
                      {n?.wifiSurfingPolicyName}
                    </TableCell>
                    <TableCell
                      className="p-4 md:p-16"
                      component="th"
                      scope="row"
                    >
                      {n.institutionName}
                    </TableCell>

                    <TableCell
                      className="p-4 md:p-16 truncate"
                      component="th"
                      scope="row"
                    >
                      {n?.institutionBranchName}
                    </TableCell>

                    <TableCell
                      className="p-4 md:p-16"
                      component="th"
                      scope="row"
                    >
                      {n.institutionGatewayDetailName}
                    </TableCell>


                    <TableCell
                      className="p-4 md:p-16"
                      component="th"
                      scope="row"
                      align="left"
                    >
                      {n?.wifiUpLimitKbps}
                    </TableCell>
                    <TableCell
                      className="p-4 md:p-16"
                      component="th"
                      scope="row"
                      align="left"
                    >
                      {n?.wifiDownLimitKbps}
                    </TableCell>
                    <TableCell
                      className="p-4 md:p-16"
                      component="th"
                      scope="row"
                      align="left"
                    >
                      {n?.wifiSurfingPolicyIsActive ? 'ACTIVE' : 'INACTIVE'}
                    </TableCell>
                  </TableRow>
                )
              })}
          </TableBody>
        </Table>
      </FuseScrollbars>



      <TablePagination
        className="shrink-0 border-t-1"
        component="div"
        count={totalItems}
        rowsPerPage={rowsPerPage}
        page={page}
        backIconButtonProps={{
          'aria-label': 'Previous Page',
        }}
        nextIconButtonProps={{
          'aria-label': 'Next Page',
        }}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  )
}

export default withRouter(ProductsTable)
