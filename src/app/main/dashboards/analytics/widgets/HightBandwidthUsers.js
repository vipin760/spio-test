import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { memo } from 'react';
import { useSelector } from 'react-redux';
import Chip from '@mui/material/Chip';
//import { selectWidgets } from '../../../store/widgetsSlice';

function HighBandwidthUsers(props) {
  const widgets = {
    "columns": [
      "Type",
      "User",
      "Upload ",
      "Download",
      // "Remaining (USD)",
      // "Remaining (%)"
    ],
    "rows": [
      {
        "type": "Student",
        "name": "Mohini",
        "expensesAmount": 5,
        "expensesPercentage": 2,
        // "remainingAmount": 880,
        // "remainingPercentage": 5.92
      },
      {
        "type": "Parent/Guest",
        "total": "Gayatri",
        "expensesAmount": 2,
        "expensesPercentage": 10,
        // "remainingAmount": 3839.66,
        // "remainingPercentage": 18.22
      },
      {
        "type": "Staff",
        "total": "Snehadeep",
        "expensesAmount": 10,
        "expensesPercentage": 8,
        // "remainingAmount": 31202,
        // "remainingPercentage": 89.87
      },
      {
        "type": "IOT",
        "total": "Bhargav",
        "expensesAmount": 5,
        "expensesPercentage": 2,
        // "remainingAmount": 18600,
        // "remainingPercentage": 100
      },
      {
        "type": "Private User",
        "total": "Basha",
        "expensesAmount": 6,
        "expensesPercentage": 10,
        // "remainingAmount": 14860.16,
        // "remainingPercentage": 42.8
      }
    ]
  };
  const { columns, rows } = widgets;

  return (
    <Paper className="flex flex-col flex-auto p-24 shadow rounded-2xl overflow-hidden">
      <Typography className="text-lg font-medium tracking-tight leading-6 truncate">
        High Bandwidth Users
      </Typography>

      <div className="table-responsive">
        <Table className="w-full min-w-full">
          <TableHead>
            <TableRow>
              {columns.map((column, index) => (
                <TableCell key={index}>
                  <Typography
                    color="text.secondary"
                    className="font-semibold text-12 whitespace-nowrap"
                  >
                    {column}
                  </Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={index}>
                {Object.entries(row).map(([key, value]) => {
                  switch (key) {
                    case 'type': {
                      return (
                        <TableCell key={key} component="th" scope="row">
                          <Chip size="small" label={value} />
                        </TableCell>
                      );
                    }
                    case 'expensesAmount':
                    case 'remainingAmount': {
                      return (
                        <TableCell key={key} component="th" scope="row">
                          <Typography className="">{`${value} GB`}</Typography>
                        </TableCell>
                      );
                    }
                    case 'expensesPercentage':
                    case 'remainingPercentage': {
                      return (
                        <TableCell key={key} component="th" scope="row">
                          <Typography className="">{`${value} GB`}</Typography>
                        </TableCell>
                      );
                    }
                    default: {
                      return (
                        <TableCell key={key} component="th" scope="row">
                          <Typography className="">{value}</Typography>
                        </TableCell>
                      );
                    }
                  }
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Paper>
  );
}

export default memo(HighBandwidthUsers);
