import FuseScrollbars from "@fuse/core/FuseScrollbars";
import _ from "@lodash";
import Checkbox from "@mui/material/Checkbox";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import clsx from "clsx";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import withRouter from "@fuse/core/withRouter";
import FuseLoading from "@fuse/core/FuseLoading";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import {
  getBranches,
  getUsers,
  selectUsers,
  selectProductsSearchText,
} from "../../store/productsSlice";
import ProductsTableHead from "./ProductsTableHead";
import { Button } from "@mui/material";
import { saveProduct } from "../../store/productSlice";
import { useSnackbar } from "notistack";
import { useParams } from "react-router-dom";

function ProductsTable(props) {
  const dispatch = useDispatch();
  const products = useSelector(selectUsers);
  const searchText = useSelector(selectProductsSearchText);
  const [loader, setLoader] = useState(false);
  const [loading, setLoading] = useState(true);
  const [dataFetched, setDataFetched] = useState(false);
  const [selected, setSelected] = useState([]);
  const [data, setData] = useState(products);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [order, setOrder] = useState({
    direction: "asc",
    id: null,
  });
  const { enqueueSnackbar } = useSnackbar();
  const routeParams = useParams();


  useEffect(() => {
    dispatch(
      getUsers({ statusMasterId: "11", startIndex: 0, lastIndex: 0 })
    ).then(() => setDataFetched(true));
  }, [dispatch,routeParams]);

  useEffect(() => {
    if (dataFetched) {
      setLoading(false);
    }
  }, [data]);

  useEffect(() => {
    if (searchText.length !== 0) {
      setData(
        _.filter(
          products,
          (item) =>
            item.wifiUserName
              .toLowerCase()
              .includes(searchText.toLowerCase()) ||
            item?.wifiUserLoginId
              .toLowerCase()
              .includes(searchText.toLowerCase()) ||
            item?.wifiUserMobileNo
              .toLowerCase()
              .includes(searchText.toLowerCase())
        )
      );
      setPage(0);
    } else {
      setData(products);
    }
  }, [products, searchText]);

  function handleRequestSort(event, property) {
    const id = property;
    let direction = "desc";

    if (order.id === property && order.direction === "desc") {
      direction = "asc";
    }

    setOrder({
      direction,
      id,
    });
  }

  function handleSelectAllClick(event) {
    if (event.target.checked) {
      setSelected(data.map((n) => n.id));
      return;
    }
    setSelected([]);
  }

  function handleDeselect() {
    setSelected([]);
  }

  // function handleClick(item) {
  //   //props.navigate(`/registered_users/${item.id}`)
  //   saveProduct({...item,statusMasterId:'1,2,3,4,5',wifiUserRegistered:1})
  //   console.log("user", item);

  // }
  async function handleSaveProduct(item) {
    try {
      setLoader(true);
      const params = {
        ...item,
        statusMasterId: "1",
        wifiUserRegistered: null,
      };
      console.log("usere4eee44e44", params);
      let a = await dispatch(saveProduct(params)).then((response) => {
        if (response) {
          console.log("user created", response);
          localStorage.setItem("isRefreshList", true);
          navigate("/registered_users");
          //dispatch(getUsers({lastIndex:9,startIndex: 0}))
        }
      });
      if (a?.error?.message) {
        enqueueSnackbar(a?.payload || "Error Occured", {
          variant: "error",
        });
        return;
      }
      navigate("/registered_users");
    } catch (err) {
      enqueueSnackbar("Error Occured", {
        variant: "error",
      });
    }
    setLoader(false);
  }

  function handleCheck(event, id) {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  }

  function handleChangePage(event, value) {
    setPage(value);
  }

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(event.target.value);
  }

  if (loading) {
    return (
      <div className="w-full flex items-center justify-center h-full">
        <FuseLoading />
      </div>
    );
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
    );
  }

  return (
    <div className="w-full flex flex-col min-h-full">
      <FuseScrollbars className="grow overflow-x-auto">
        <Table stickyHeader className="min-w-xl" aria-labelledby="tableTitle">
          <ProductsTableHead
            selectedProductIds={selected}
            order={order}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={data.length}
            onMenuItemClick={handleDeselect}
          />

          <TableBody>
            {_.orderBy(
              data,
              [
                (o) => {
                  switch (order.id) {
                    case "categories": {
                      return o.categories[0];
                    }
                    default: {
                      return o[order.id];
                    }
                  }
                },
              ],
              [order.direction]
            )
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((n) => {
                const isSelected = selected.indexOf(n.id) !== -1;
                return (
                  <TableRow
                    className="h-72 cursor-pointer"
                    hover
                    role="checkbox"
                    aria-checked={isSelected}
                    tabIndex={-1}
                    key={n.id}
                    selected={isSelected}
                    // onClick={(event) => handleClick(n)}
                  >
                    <TableCell
                      className="p-4 md:p-16"
                      component="th"
                      scope="row"
                    >
                      {n.wifiUserName}
                    </TableCell>

                    <TableCell
                      className="p-4 md:p-16 truncate"
                      component="th"
                      scope="row"
                    >
                      {n?.wifiUserLoginId}
                    </TableCell>

                    <TableCell
                      className="p-4 md:p-16"
                      component="th"
                      scope="row"
                    >
                      {n.wifiUserMobileNo}
                    </TableCell>

                    <TableCell
                      className="p-4 md:p-16"
                      component="th"
                      scope="row"
                      align="right"
                    >
                      {n?.wifiUserCreatedTime}
                    </TableCell>
                    <TableCell
                      className="p-4 md:p-16"
                      component="th"
                      scope="row"
                      align="right"
                    >
                      {n?.countOfSessionStart}
                    </TableCell>
                    <TableCell
                      className="p-4 md:p-16"
                      component="th"
                      scope="row"
                      align="right"
                    >
                      {n?.wifiUserCreatedTime}
                    </TableCell>
                    <TableCell
                      className="p-4 md:p-16"
                      component="th"
                      scope="row"
                      align="right"
                    >
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={(event) => handleSaveProduct(n)}
                      >
                        Verify
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </FuseScrollbars>

      <TablePagination
        className="shrink-0 border-t-1"
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        backIconButtonProps={{
          "aria-label": "Previous Page",
        }}
        nextIconButtonProps={{
          "aria-label": "Next Page",
        }}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
}

export default withRouter(ProductsTable);
