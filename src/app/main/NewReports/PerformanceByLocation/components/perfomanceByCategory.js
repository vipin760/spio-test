import { Box } from '@mui/material'
import React from 'react'
import TableComponent from './tableComponent'

const PerfomanceByCategory = () => {

  const columns = [
    { id: 'category', label: 'Category' },
    { id: 'grade', label: 'Grade' },
    { id: 'values', label: 'Values' },
  ];

  function createData(category,grade,values) {
    return { category, grade, values };
  }
  
  const rows = [
    createData('Crew', "A", 70158),
    createData('Price', "C+", 14418),
    createData('Claims', "C+", 10443),
    createData('Operations', "D", 2269),
  ];

  return (
    <Box className='flex'>
      <div className='w-[50%]'>
        <TableComponent columns={columns} rows={rows} />
      </div>
      <div className='w-[50%]'>Right</div>
    </Box>
  )
}

export default PerfomanceByCategory