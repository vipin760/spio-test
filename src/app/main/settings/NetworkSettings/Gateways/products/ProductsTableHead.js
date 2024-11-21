import Checkbox from '@mui/material/Checkbox'
import IconButton from '@mui/material/IconButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import MenuList from '@mui/material/MenuList'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import TableSortLabel from '@mui/material/TableSortLabel'
import Tooltip from '@mui/material/Tooltip'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Box } from '@mui/system'
import TableHead from '@mui/material/TableHead'
import FuseSvgIcon from '@fuse/core/FuseSvgIcon'
import { lighten } from '@mui/material/styles'
import { removeProducts } from '../store/productsSlice'

const rows = [
  {
    id: 'institutionGatewayDetailId',
    align: 'left',
    disablePadding: true,
    label: 'Gateway ID',
    sort: true,
  },
  {
    id: 'institutionGatewayLocation',
    align: 'left',
    disablePadding: false,
    label: 'Location Name',
    sort: true,
  },
  {
    id: 'institutionMasterName',
    align: 'left',
    disablePadding: false,
    label: 'Org Name',
    sort: true,
  },
  {
    id: 'institutionGatewayName',
    align: 'left',
    disablePadding: false,
    label: 'Profile Name',
    sort: true,
  },
  {
    id: 'institutionGatewaySerialNo',
    align: 'left',
    disablePadding: false,
    label: 'Gateway Serial No.',
    sort: true,
  },
  {
    id: 'institutionBranchName',
    align: 'left',
    disablePadding: false,
    label: 'Branch',
    sort: true,
  },
  {
    id: 'institutionGatewayHashName',
    align: 'left',
    disablePadding: false,
    label: 'Gateway Name',
    sort: true,
  },
  {
    id: 'institutionGatewayMac',
    align: 'left',
    disablePadding: false,
    label: 'MAC',
    sort: true,
  },
  {
    id: 'institutionGatewayCreatedTime',
    align: 'left',
    disablePadding: false,
    label: 'Created Date',
    sort: true,
  },
  {
    id: 'institutionGatewayStatusName',
    align: 'left',
    disablePadding: false,
    label: 'Status',
    sort: true,
  },
]

function ProductsTableHead(props) {
  const { selectedProductIds } = props
  const numSelected = selectedProductIds.length

  const [selectedProductsMenu, setSelectedProductsMenu] = useState(null)

  const dispatch = useDispatch()

  const createSortHandler = (property) => (event) => {
    props.onRequestSort(event, property)
  }

  function openSelectedProductsMenu(event) {
    setSelectedProductsMenu(event.currentTarget)
  }

  function closeSelectedProductsMenu() {
    setSelectedProductsMenu(null)
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
                    borderBottom: '2px solid #dddddd'
              }}
              className="p-4 md:p-12"
              key={row.id}
              align={row.align}
              padding={row.disablePadding ? 'none' : 'normal'}
              sortDirection={
                props.order.id === row.id ? props.order.direction : false
              }
            >
              {row.sort && (
                <Tooltip
                  title="Sort"
                  placement={
                    row.align === 'right' ? 'bottom-end' : 'bottom-start'
                  }
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={props.order.id === row.id}
                    direction={props.order.direction}
                    onClick={createSortHandler(row.id)}
                    className="p-4 font-semibold text-base text-[#212121] font-sans"
                    
                  >
                    {row.label}
                  </TableSortLabel>
                </Tooltip>
              )}
            </TableCell>
          )
        }, this)}
      </TableRow>
    </TableHead>
  )
}

export default ProductsTableHead
