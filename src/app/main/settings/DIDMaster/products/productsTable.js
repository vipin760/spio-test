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
import ProductsTableHead from './productsTableHeader'
import { useParams } from 'react-router-dom'
import { getProducts, searchFilter, setProductsSearchText } from '../store/productsSlice'

function ProductsTable(props) {
  const dispatch = useDispatch()
  const products = useSelector((state) => state.didMaster.products.data);
  const searchText = useSelector((state) => state.didMaster.products.searchText);
  const meta = useSelector((state) => state.didMaster.products?.meta);
  const [loading, setLoading] = useState(true)
  const [dataFetched, setDataFetched] = useState(false);
  const [selected, setSelected] = useState([]);
  const [totalItems, setTotalItem] = useState(10);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const [order, setOrder] = useState({
    direction: 'asc',
    id: null,
  });

  useEffect(() => {
    dispatch(setProductsSearchText(""));
  }, []);

  useEffect(() => {
    if (products) {
      setData(products);
    } else {
      setData([]);
    }
  }, [products]);

  useEffect(() => {
    if (!searchText) {
      dispatch(searchFilter({ val: "" }));
    } else {
      setPage(0);
      dispatch(searchFilter({ val: searchText }));
    }
  }, [dispatch, searchText]);

  useEffect(() => {
    var startIndex = page * rowsPerPage;
    var endIndex = Math.min(startIndex + rowsPerPage - 1, totalItems - 1);
    const params = {
      startIndex: startIndex,
      lastIndex: rowsPerPage
    }
    dispatch(searchFilter({ val: searchText, page: +page + 1, limit: rowsPerPage })).then(() => setDataFetched(true))
  }, [page, rowsPerPage]);

  useEffect(() => {
    if (dataFetched) {
      setLoading(false)
    }
  }, [data])

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
    setPage(0);
    props.navigate(`/did_master/${item.tbl_connect_did_unique_id}`)
  }

  function handleChangePage(event, value) {
    dispatch(searchFilter({ val: searchText, page: +value + 1, limit: rowsPerPage }))
    setPage(value)
  }

  function handleChangeRowsPerPage(event) {
    let value = +event.target.value;
    setRowsPerPage(value);
    dispatch(searchFilter({ val: searchText, page: 1, limit: value }));
    setPage(0);
  }

  if (loading) {
    return (
      <div className="w-full flex items-center justify-center h-full">
        <FuseLoading />
      </div>
    )
  }

  if (data?.length === 0) {
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

  return (
    <div className="w-full flex flex-col h-[50rem]">
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
                  switch (order?.tbl_connect_did_unique_id) {
                    case 'categories': {
                      return o.categories[0]
                    }
                    default: {
                      return o[order?.tbl_connect_did_unique_id]
                    }
                  }
                },
              ],
              [order.direction],
            )
              .slice(0, 10)
              .map((n) => {
                const isSelected = selected.indexOf(n.tbl_connect_did_unique_id) !== -1
                return (
                  <TableRow
                    className="h-72 cursor-pointer"
                    hover
                    role="checkbox"
                    aria-checked={isSelected}
                    tabIndex={-1}
                    key={n.tbl_connect_did_unique_id}
                    selected={isSelected}
                    onClick={(event) => handleClick(n)}
                  >
                    <TableCell
                      className="p-4 md:p-16"
                      component="th"
                      scope="row"
                    >
                      {n.did_no}
                    </TableCell>

                    <TableCell
                      className="p-4 md:p-16 truncate"
                      component="th"
                      scope="row"
                    >
                      {n?.sip_line_name}
                    </TableCell>

                    <TableCell
                      className="p-4 md:p-16"
                      component="th"
                      scope="row"
                    >
                      {n.state_name}
                    </TableCell>

                    <TableCell
                      className="p-4 md:p-16"
                      component="th"
                      scope="row"
                      align="left"
                    >
                      {n?.sip_location}
                    </TableCell>
                    <TableCell
                      className="p-4 md:p-16"
                      component="th"
                      scope="row"
                      align="left"
                    >
                      {n?.wifiUserAccessPolicyCreatedTime}
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
        count={+meta ?? data?.length}
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
