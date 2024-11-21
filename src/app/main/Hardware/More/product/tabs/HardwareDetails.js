import FuseScrollbars from '@fuse/core/FuseScrollbars'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import { lighten } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import { Controller, useForm, useFormContext } from 'react-hook-form'
import { useEffect, useState } from 'react'

function HardwareDetails(props) {
  const methods = useFormContext()
  const { control, setValue, getValues, watch } = methods
  const floorData = getValues()?.floors

  const [noOfRooms, setRooms] = useState(0)
  const [roomsData, setRoomsData] = useState({})
  const [floors, setFloors] = useState([])
  const [open, setOpen] = useState(false)
  const [selectedFloorIndex, setSelectedFloorIndex] = useState(0)
  function getFloorName(_no) {
    return 'F' + _no
  }

  useEffect(() => {
    setFloors(floorData)
  }, [floorData])

  const onsetNoOfFloors = (value) => {
    let floorsData = [...floors]
    if (parseFloat(value) > floorsData.length) {
      const arrayLength = parseFloat(value) - floorsData.length
      Array.from({ length: arrayLength }).forEach((_, i) => {
        floorsData.push({
          floor: floors.length == 0 ? i + 1 : floorsData.length + (i + 1),
          name: `F${floors.length == 0 ? i + 1 : floorsData.length + (i + 1)}`,
          no_of_rooms: '',
          rooms: [],
          status: 'ACTIVE',
        })
      })
    } else if (parseFloat(value) < floorsData.length) {
      const arrayLength = parseFloat(value) - floorsData.length
      floorsData.splice(arrayLength)
    }
    console.log('datadata', floorsData)
    setFloors(floorsData)
    setValue('floors', floorsData)
  }

  const setNoOfBedsData = (value, i) => {
    let data = floors
    let obj = data[selectedFloorIndex]
    obj.rooms[i].no_of_beds = value
    setRoomsData(obj?.rooms)
    data[selectedFloorIndex] = obj
    setFloors(data)
    setValue('floors', floors)
  }
  const setBedsName = (name, i) => {
    let data = floors
    let obj = data[selectedFloorIndex]
    obj.rooms[i].name = name
    setRoomsData(obj?.rooms)
    data[selectedFloorIndex] = obj
    setFloors(data)
    setValue('floors', floors)
  }
  const onClickNoOfRooms = (e, index) => {
    const value = e.target.value
    let data = floors
    let floordata = data[index]

    floordata.no_of_rooms = value
    let rooms = floordata?.rooms || []
    if (parseFloat(value) > rooms.length) {
      const arrayLength = parseFloat(value) - rooms.length
      Array.from({ length: arrayLength }).forEach((_, i) => {
        rooms.push({
          name: floordata?.name + 'R' + (i + 1),
          no_of_beds: '',
          status: 'ACTIVE',
        })
      })
    } else if (parseFloat(value) < rooms.length) {
      const arrayLength = parseFloat(value) - rooms.length
      rooms.splice(arrayLength)
      console.log('floorData arrayLength', arrayLength, rooms)
    }
    floordata.rooms = rooms
    data[index] = floordata

    setRoomsData(rooms)
    setSelectedFloorIndex(index)
    if (e.target.value) {
      if (!open && parseFloat(e.target.value) > 0) {
        setOpen(true)
      }
    }
    setFloors(data)
    setValue('floors', data)
  }

  console.log('open', open)

  return (
    <div>
      <Table stickyHeader className="min-w-xl" aria-labelledby="tableTitle">
        <TableHead>
          <TableRow className="h-48 sm:h-64">
            {['Gateway ID', 'UP Time', 'Firmware'].map((item, i) => (
              <TableCell
                sx={{
                  backgroundColor: (theme) =>
                    theme.palette.mode === 'light'
                      ? lighten(theme.palette.background.default, 0.4)
                      : lighten(theme.palette.background.default, 0.02),
                }}
                className="p-4 md:p-16"
                key={item + i}
                align={'center'}
                padding={'normal'}
                sortDirection={false}
              >
                {item}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          <TableRow hover className="h-72 cursor-pointer">
            <TableCell className="w-40 md:w-64 text-center" padding="none">
              71B2062ADBDD
            </TableCell>
            <TableCell className="w-40 md:w-64 text-center" padding="none">
              1w3d10h56m32s
            </TableCell>
            <TableCell className="w-40 md:w-64 text-center" padding="none">
              6.49.7 (stable)
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}

export default HardwareDetails
