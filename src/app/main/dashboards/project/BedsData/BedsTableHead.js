import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Tooltip from '@mui/material/Tooltip';
import { useSelector } from 'react-redux';
import TableHead from '@mui/material/TableHead';
import { lighten } from '@mui/material/styles';
import { selectUser } from 'app/store/userSlice';
import { User_Roles } from 'src/app/globalConstants';

let rows = [
  {
    id: 'bed',
    align: 'left',
    disablePadding: false,
    label: 'Bed',
    sort: true,
  },
  {
    id: 'room',
    align: 'left',
    disablePadding: false,
    label: 'Room',
    sort: true,
  },
  {
    id: 'floor',
    align: 'right',
    disablePadding: false,
    label: 'Floor',
    sort: true,
  },
  {
    id: 'building',
    align: 'right',
    disablePadding: false,
    label: 'Building',
    sort: true,
  },
  {
    id: 'bodyMap',
    align: 'right',
    disablePadding: false,
    label: 'Body Map',
    sort: true,
  }
];

function appendActiveColumn() {
  const findActiveHead = rows.find(h => h.id == 'active');
  if (!findActiveHead) {
    rows.push({
      id: 'active',
      align: 'right',
      disablePadding: false,
      label: 'Status',
      sort: true,
    });
  }
}

function BedsTableHead(props) {
  const user = useSelector(selectUser);

  const createSortHandler = (property) => (event) => {
    props.onRequestSort(event, property);
  };

  
  if ([User_Roles.Owner, User_Roles.Full_Access, User_Roles.Read_Write].includes(user?.role)) {
    appendActiveColumn();
  }


  return (
    <TableHead>
      <TableRow className="h-48 sm:h-64">
        {rows.map((row) => {
          return (
            <TableCell
              sx={{
                backgroundColor: (theme) =>
                  theme.palette.mode === 'light'
                    ? lighten(theme.palette.background.default, 0.4)
                    : lighten(theme.palette.background.default, 0.02),
              }}
              className="p-4 md:p-16"
              key={row.id}
              align={row.align}
              padding={row.disablePadding ? 'none' : 'normal'}
              sortDirection={props.order.id === row.id ? props.order.direction : false}
            >
              {row.sort && (
                <Tooltip
                  title="Sort"
                  placement={row.align === 'right' ? 'bottom-end' : 'bottom-start'}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={props.order.id === row.id}
                    direction={props.order.direction}
                    onClick={createSortHandler(row.id)}
                    className="font-semibold"
                  >
                    {row.label}
                  </TableSortLabel>
                </Tooltip>
              )}
            </TableCell>
          );
        }, this)}
      </TableRow>
    </TableHead>
  );
}

export default BedsTableHead;
