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
import { getProducts, searchFilter, selectBranches, selectProductsSearchText } from '../store/productsSlice';
import { getProducts as didMasterGetProducts } from '../../DIDMaster/store/productsSlice'
import moment from 'moment';

function ProductsTable(props) {
  const dispatch = useDispatch()
  const products = useSelector((state) => state.virtualNoMapping.products.data);
  const meta = useSelector((state) => state.virtualNoMapping.products?.meta);
  const searchText = useSelector(selectProductsSearchText);
  const [loading, setLoading] = useState(true)
  const [dataFetched, setDataFetched] = useState(false);
  const [selected, setSelected] = useState([]);
  const [totalItems, setTotalItem] = useState(10);
  const [data, setData] = useState(products);
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [usersList, setUsersList] = useState(null);
  const router = useParams();

  const [order, setOrder] = useState({
    direction: 'asc',
    id: null,
  });

  useEffect(() => {
    if (products) {
      setData(products);
    }
  }, [products]);

  useEffect(() => {
    if (!searchFilter) {
      dispatch(searchFilter({ val: "" }));
    } else {
      setPage(0);
      dispatch(searchFilter({ val: searchText }));
    }
  }, [dispatch, searchText, router]);

  // useEffect(() => {
  //   dispatch(getProducts());
  // }, [dispatch, router]);

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
  }, [data]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await dispatch(didMasterGetProducts());
        setUsersList(response?.payload?.data); // Log the response
      } catch (error) {
        console.error("Error fetching products:", error);  // Handle any errors
      }
    };

    fetchProducts();  // Call the async function

  }, [dispatch]);

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
    props.navigate(`/virtualNoMappingCopy/${item}`)
  }

  function handleCheck(event, id) {
    const selectedIndex = selected.indexOf(id)
    let newSelected = []

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected?.length - 1) {
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
              .map((n) => {
                const isSelected = selected.indexOf(n.id) !== -1

                return (
                  <TableRow
                    className="h-72 cursor-pointer"
                    hover
                    role="checkbox"
                    aria-checked={isSelected}
                    tabIndex={-1}
                    key={n.id}
                    selected={isSelected}
                    onClick={(event) => handleClick(n.tbl_connect_did_map_id)}
                  // n, tbl_connect_did_map_id
                  >
                    <TableCell
                      className="p-4 md:p-16"
                      component="th"
                      scope="row"
                    >
                      {usersList?.filter((user) => user.tbl_connect_did_unique_id == n?.did_unique_id)[0]?.did_no || ""}
                    </TableCell>

                    <TableCell
                      className="p-4 md:p-16 truncate"
                      component="th"
                      scope="row"
                    >
                      {n?.virtual_no}
                    </TableCell>

                    <TableCell
                      className="p-4 md:p-16"
                      component="th"
                      scope="row"
                    >
                      {n.profile_name}
                    </TableCell>

                    <TableCell
                      className="p-4 md:p-16"
                      component="th"
                      scope="row"
                      align="left"
                    >
                      {new Date(n.start_datetime)?.toLocaleDateString('en-GB')}
                      {/* {moment(n.start_datetime).format('YYYY-MM-DD HH:mm:ss')} */}
                    </TableCell>
                    <TableCell
                      className="p-4 md:p-16"
                      component="th"
                      scope="row"
                      align="left"
                    >
                      {new Date(n.start_datetime)?.toLocaleDateString('en-GB')}
                    </TableCell>
                    <TableCell
                      className="p-4 md:p-16"
                      component="th"
                      scope="row"
                      align="left"
                    >
                      {n?.campain_name}
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
        count={meta ?? data?.length}
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
