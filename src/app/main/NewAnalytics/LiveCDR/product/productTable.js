import { Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts, searchFilter, selectProducts } from '../store/productSlice';
import dayjs from 'dayjs';
import moment from 'moment';

const columns = [
    { id: 'country', label: 'Country' },
    { id: 'mobile_no', label: 'Mobile No' },
    { id: 'virtual_no', label: 'Virtual No' },
    { id: 'transition_id', label: 'Transition ID' },
    { id: 'did', label: 'DID' },
    { id: 'start_date', label: 'Start Date' },
    { id: 'end_date', label: 'End Date' },
    { id: 'contestant_name', label: 'Contestant Name' },
    { id: 'status', label: 'Status' },
  ];
  

const ProductTable = ({ searchTerm,searchColumn = "country" }) => {
    
    const convertedSearch = searchColumn.toLowerCase().split(" ").join("_");

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const products = useSelector((state)=>state?.LiveCDR?.product?.data)
    const [data,setData] = useState([]); 
    const searchText = useSelector((state)=> state?.LiveCDR?.product?.searchText);
    const totalRecords = useSelector((state)=> state?.LiveCDR?.product?.meta);
    console.log("search",totalRecords);
    

    const dispatch = useDispatch();

    useEffect(() => {
        if (products) {
          setData(products);
        }else{
          setData([]);
        }
      }, [products]);

    useEffect(()=>{
        if(searchText){
            setPage(0);
            dispatch(searchFilter({val: searchText}));
        }else{
            dispatch(getProducts());
        }
    },[searchText,dispatch]);

      useEffect(()=>{
        if(products?.length > 0){
            const result = products?.map((val)=>({
                ...val,
                start_date:moment(val.start_date).format("yyyy-MM-DD"),
                end_date:moment(val.end_date).format("yyyy-MM-DD"),
            }));
            setData(result);
        }
      },[products]);

    const handleChangePage = (event, newPage) => {
        dispatch(searchFilter({val: searchText,page: +newPage + 1, limit: rowsPerPage}));
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        let value = +event.target.value;
        setRowsPerPage(value);
        dispatch(searchFilter({val: searchText,page: 1, limit: rowsPerPage}));
        setPage(0);
    };

    // function createData(country, mobile_number, virtual_number, transition_id,did,start_date,end_date,contestant_name,status) {
    //     return { country, mobile_number, virtual_number, transition_id, did ,start_date,end_date,contestant_name,status};
    //   }

    // const rows = [
    //     createData('India', "000000000",1111111111, 1122334455667788, 748398728937,"11-09-2000 11.34am","11-09-2005 11.34am","Pradeep Narwal","Invalid"),
    //     createData('Pakistan', 8940891661,9655082021, 8759483729787463, 748398728937,"02-04-2024 11.34am","01-12-2024 11.34am","Syam Patil","Invalid"),
    //     createData('US', 8940891661,9655082021, 8759483729787463, 748398728937,"02-04-2024 11.34am","01-12-2024 11.34am","Syam Patil","Invalid"),
    //     createData('Dubai', 8940891661,9655082021, 8759483729787463, 748398728937,"02-04-2024 11.34am","01-12-2024 11.34am","Syam Patil","Invalid"),
    //     createData('Qatar', 8940891661,9655082021, 8759483729787463, 748398728937,"02-04-2024 11.34am","01-12-2024 11.34am","Syam Patil","Invalid"),
    //     createData('Oman', 8940891661,9655082021, 8759483729787463, 748398728937,"02-04-2024 11.34am","01-12-2024 11.34am","Syam Patil","Invalid"),
    //     createData('Russia', 8940891661,9655082021, 8759483729787463, 748398728937,"02-04-2024 11.34am","01-12-2024 11.34am","Syam Patil","Invalid"),
    //     createData('Australia', 8940891661,9655082021, 8759483729787463, 748398728937,"02-04-2024 11.34am","01-12-2024 11.34am","Syam Patil","Invalid"),
    //     createData('Bangaladesh', 8940891661,9655082021, 8759483729787463, 748398728937,"02-04-2024 11.34am","01-12-2024 11.34am","Syam Patil","Invalid"),
    //     createData('Srilanka', 8940891661,9655082021, 8759483729787463, 748398728937,"02-04-2024 11.34am","01-12-2024 11.34am","Syam Patil","Invalid"),
    //     createData('South africa', 8940891661,9655082021, 8759483729787463, 748398728937,"02-04-2024 11.34am","01-12-2024 11.34am","Syam Patil","Invalid"),
    //     createData('Brazilian', 8940891661,9655082021, 8759483729787463, 748398728937,"02-04-2024 11.34am","01-12-2024 11.34am","Syam Patil","success"),
    //   ];      
      
    //   const filteredData = rows.filter((row)=>String(row[convertedSearch]).toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <div>
            <Paper style={{ display: 'flex', flexDirection: 'column', height: '51rem' }}>
                <TableContainer  style={{ flexGrow: 1, overflow: 'auto' }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow sx={{
                                ".MuiTableCell-root": {
                                    borderBottom: "2px solid #ccc"
                                  }
                            }}>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{ minWidth: column.minWidth }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data?.slice(0,10)
                                .map((row) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.code}  sx={{
                                            ".MuiTableCell-root": {
                                                borderBottom: "1px solid #ccc"
                                              }
                                        }}>
                                            {columns?.map((column) => {
                                                const value = row[column?.id];                                               
                                                return (
                                                    <TableCell key={column?.id} align={column?.align}>
                                                        {column.format && typeof value === 'number'
                                                            ? column.format(value)
                                                            : value}
                                                    </TableCell>
                                                );
                                            })}
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={totalRecords ?? data?.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    style={{ marginTop: 'auto',height: '7rem' }}
                />
            </Paper>
        </div>
    )
}

export default ProductTable