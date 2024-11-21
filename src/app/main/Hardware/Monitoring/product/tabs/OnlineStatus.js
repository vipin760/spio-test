import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import { Controller, useFormContext } from 'react-hook-form'
import LinearProgress, {
  linearProgressClasses,
} from '@mui/material/LinearProgress'

import mockApi from '../../../../../../@mock-api/mock-api.json'
import Typography from '@mui/material/Typography'
import { Link, useNavigate } from 'react-router-dom'
import { styled } from '@mui/material/styles'
import { Checkbox } from '@mui/material'
import { motion } from 'framer-motion'
import DatePicker from '@mui/lab/DateTimePicker'
import { TimePicker } from '@mui/x-date-pickers/TimePicker'
import { useState } from 'react'
function OnlineStatus(props) {
  const methods = useFormContext()
  const tags = mockApi.components.examples.contacts_tags.value
  const [showMore, setShowMore] = useState(false)
  const { control, formState } = methods
  const { errors } = formState
  const progressData = [
    { name: 'Today', value: 50 },
    { name: '22-12-2022', value: 60 },
  ]
  const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 13,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor:
        theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
    },
  }))

  return (
    <motion.div>
      {progressData.map((ele, i) => {
        return (
          <>
            {(i == 0 && !showMore) || showMore ? (
              <div className="flex flex-col mb-20">
                <Typography clasName="mb-20" variant="h6">
                  {ele?.name}
                </Typography>
                <BorderLinearProgress
                  variant="determinate"
                  value={ele?.value}
                />
              </div>
            ) : null}
          </>
        )
      })}
      <Link
        className="text-md font-medium justify-end flex"
        to=""
        onClick={() => setShowMore(true)}
      >
        showMore
      </Link>
    </motion.div>
  )
}

export default OnlineStatus
