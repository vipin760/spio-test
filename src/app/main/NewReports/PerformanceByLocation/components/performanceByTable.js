import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';

// Define columns
const columns = [
    { id: 'location', label: 'Location' },
    {
        id: 'overall', label: 'Overall',
        format: (value) =>
            value.toString() === 'B' || value.toString() === 'B+'
                ? <span style={{ color: '#7bed9f', fontWeight: 500 }}>{value}</span>
                : value.toString() === 'A' || value.toString() === 'A+' ? <span style={{ color: '#2ed573', fontWeight: 500 }}>{value}</span> : <span>{value}</span>
    },
    {
        id: 'claims',
        label: 'Claims',
        // align: 'right',
        format: (value) => {
            const valueStr = value.toString().split(" ");
            const letter = valueStr[0];
            const number = valueStr[1];
            return (
                letter === 'B' || letter === 'B+'
                    ? <div><span style={{ color: '#7bed9f', fontWeight: 500 }}>{letter + " "}</span> {number}</div>
                    : letter === 'A' || letter === 'A+' ? <div><span style={{ color: '#2ed573', fontWeight: 500 }}>{letter + " "}</span>{number}</div> : <div><span style={{ color: '#ff7f50', fontWeight: 500 }}>{letter + " "}</span>{number}</div>
            )
        }
    },
    {
        id: 'crew',
        label: 'Crew',
        // align: 'right',
        format: (value) => {
            const valueStr = value.toString().split(" ");
            const letter = valueStr[0];
            const number = valueStr[1];
            return (
                letter === 'B' || letter === 'B+'
                    ? <div><span style={{ color: '#7bed9f', fontWeight: 500 }}>{letter + " "}</span> {number}</div>
                    : letter === 'A' || letter === 'A+' ? <div><span style={{ color: '#2ed573', fontWeight: 500 }}>{letter + " "}</span>{number}</div> : <div><span style={{ color: '#ff7f50', fontWeight: 500 }}>{letter + " "}</span>{number}</div>
            )
        }
    },
    {
        id: 'operations',
        label: 'Operations',
        // align: 'right',
        format: (value) => {
            const valueStr = value.toString().split(" ");
            const letter = valueStr[0];
            const number = valueStr[1];
            return (
                letter === 'B' || letter === 'B+'
                    ? <div><span style={{ color: '#7bed9f', fontWeight: 500 }}>{letter + " "}</span> {number}</div>
                    : letter === 'A' || letter === 'A+' ? <div><span style={{ color: '#2ed573', fontWeight: 500 }}>{letter + " "}</span>{number}</div> :
                    letter === 'C' || letter === 'C+' ? <div><span style={{ color: '#2ed573', fontWeight: 500 }}>{letter + " "}</span>{number}</div> :
                     <div><span style={{ color: '#ff6348', fontWeight: 500 }}>{letter + " "}</span>{number}</div>
            )
        }
    },
    {
        id: 'price',
        label: 'Price',
        // align: 'right',
        format: (value) => {
            const valueStr = value.toString().split(" ");
            const letter = valueStr[0];
            const number = valueStr[1];
            return (
                letter === 'B' || letter === 'B+'
                    ? <div><span style={{ color: '#7bed9f', fontWeight: 500 }}>{letter + " "}</span> {number}</div>
                    : letter === 'A' || letter === 'A+' ? <div><span style={{ color: '#2ed573', fontWeight: 500 }}>{letter + " "}</span>{number}</div> : <div><span style={{ color: '#ff7f50', fontWeight: 500 }}>{letter + " "}</span>{number}</div>
            )
        }
    },
];

// Helper to create data rows
function createData(location, overall, claims, crew, operations, price) {
    return { location, overall, claims, crew, operations, price };
}

// Example rows of data
const rows = [
    createData('India', 'B', "A 135", "A 867", "D 46", "C+ 169"),
    createData('China', 'A', "B 135", "A 867", "D 46", "C+ 169"),
    createData('Italy', 'B', "C 135", "A 867", "D 46", "C+ 169"),
    createData('United States', 'B', "C 135", "A 867", "D 46", "C+ 169"),
    createData('Canada', 'B', "C 135", "A 867", "D 46", "C+ 169"),
    createData('Australia', 'B', "C 135", "A 867", "D 46", "C+ 169"),
    createData('Germany', 'B', "C 135", "A 867", "D 46", "C+ 169"),
    createData('Ireland', 'B', "C 135", "A 867", "D 46", "C+ 169"),
    createData('Mexico', 'B', "C 135", "A 867", "D 46", "C+ 169"),
    createData('Japan', 'B', "C 135", "A 867", "D 46", "C+ 169"),
    createData('France', 'B', "C 135", "A 867", "D 46", "C+ 169"),
    createData('United Kingdom', 'B', "C 135", "A 867", "D 46", "C+ 169"),
    createData('Russia', 'B', "C 135", "A 867", "D 46", "C+ 169"),
    createData('Nigeria', 'B', "C 135", "A 867", "D 46", "C+ 169"),
    createData('Brazil', 'B', "C 135", "A 867", "D 46", "C+ 169"),
];

export default function PerformanceByStateTable() {
    const [order, setOrder] = React.useState('asc'); // 'asc' or 'desc'
    const [orderBy, setOrderBy] = React.useState('location'); // Column to sort by
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    // Handle sorting
    const handleSort = (columnId) => {
        const isAsc = orderBy === columnId && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(columnId);
    };

    // Sorting logic
    const sortedRows = React.useMemo(() => {
        return [...rows].sort((a, b) => {
            if (orderBy) {
                if (order === 'asc') {
                    return a[orderBy] < b[orderBy] ? -1 : 1;
                } else {
                    return a[orderBy] > b[orderBy] ? -1 : 1;
                }
            }
            return 0;
        });
    }, [rows, order, orderBy]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 400 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth, background: '#ecf0f1' }}
                                >
                                    <TableSortLabel
                                        active={orderBy === column.id}
                                        direction={orderBy === column.id ? order : 'asc'}
                                        onClick={() => handleSort(column.id)}
                                    >
                                        {column.label}
                                    </TableSortLabel>
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sortedRows
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => (
                                <TableRow hover role="checkbox" tabIndex={-1} key={row.location}>
                                    {columns.map((column) => {
                                        const value = row[column.id];
                                        return (
                                            <TableCell key={column.id} align={column.align}>
                                                {column.format ? column.format(value) : value}
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}
