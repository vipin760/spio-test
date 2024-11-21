import Typography from '@mui/material/Typography'
import FuseSvgIcon from '@fuse/core/FuseSvgIcon'
import _ from '@lodash'
import Paper from '@mui/material/Paper'
import { motion } from 'framer-motion'
import { useParams } from 'react-router-dom'
import FuseLoading from '@fuse/core/FuseLoading'
import { useEffect, useState } from 'react'
import { API } from 'aws-amplify'
import { GRAPHQL_AUTH_MODE } from '@aws-amplify/auth'
import moment from 'moment'
import h337 from 'heatmap.js'

function getBedSheetData(token) {
  return new Promise(async (resolve) => {
    const bedsQuery = `query getBedSheet($token: ID!) {
      getBedSheet(token: $token) {
        bed_name
        building
        floor_name
        last_refresh_at
        location
        patient
        pressure_map
        room_name
      }
    }
    `

    const res = await API.graphql({
      query: bedsQuery,
      variables: { token: token },
      authMode: GRAPHQL_AUTH_MODE.API_KEY,
    })
    resolve(res.data.getBedSheet)
  })
}

let bodymap = null

function BedSheetPage(props) {
  const { token } = useParams()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  const refreshData = () => {
    getBedSheetData(token).then((res) => {
      // console.log('res', res);
      setData(res)
      setLoading(false)
    })
  }

  useEffect(() => {
    if (token) {
      refreshData()
    }
  }, [loading])

  if (loading) {
    return (
      <div className="flex flex-1 items-center justify-center h-full">
        <FuseLoading />
      </div>
    )
  }

  console.log('data', data)

  const detailsList = [
    {
      value: `${data.patient || '-'}`,
      title: 'Patient#:',
      icon: 'material-outline:personal_injury',
    },
    {
      value: `${data.bed_name || '-'}`,
      title: 'Bed:',
      icon: 'material-outline:bed',
    },
    {
      value: `${data.room_name || '-'}`,
      title: 'Room:',
      icon: 'material-outline:room',
    },
    {
      value: `${data.floor_name || '-'}`,
      title: 'Floor',
      icon: 'material-outline:format_list_bulleted',
    },
    {
      value: `${data.building || '-'}`,
      title: 'Building:',
      icon: 'material-outline:business',
    },
    {
      value: `${data.location || '-'}`,
      title: 'Location:',
      icon: 'material-outline:pin_drop',
    },
    {
      value: `${moment(data.last_refresh_at).format('MM/DD/YY hh:mm A') || '-'
        }`,
      title: 'Refreshed At:',
      icon: 'material-outline:refresh',
    },
  ]

  const createMap = () => {
    if (!data || !data?.pressure_map) {
      return
    }
    const { pressure_map } = data
    const timeout = window.setTimeout(() => {
      if (data && pressure_map) {
        const element = window.document.querySelector('#bodymap')

        bodymap = h337.create({
          container: element,
          radius: 30,
          maxOpacity: 0.7,
          minOpacity: 0,
          blur: 0.75,
        })
      }
      setHeatMap()
      window.clearTimeout(timeout)
      console.log('map created')
    })
  }

  const setHeatMap = () => {
    if (!data || !bodymap) {
      return
    }
    const { pressure_map } = data
    const mapData = JSON.parse(JSON.parse(pressure_map))
    bodymap.setData({
      max: 4095,
      min: 0,
      data: parcer(mapData),
    })
    bodymap.repaint()
  }

  function parcer(map) {
    let temparray = []
    for (let x = 0; x < map.length; x++) {
      map[x] = map[x].reverse()
      for (let y = 0; y < map[x].length; y++) {
        const temp = {}
        temp['x'] = x * 6.5
        temp['y'] = y * 6.5
        temp['value'] = map[x][y]
        temparray.push(temp)
      }
    }
    return temparray
  }

  if (data && !bodymap) {
    createMap()
  }

  return (
    <div className="flex flex-col flex-auto items-center sm:justify-center min-w-0">
      <Paper className="w-full sm:w-auto min-h-full sm:min-h-auto rounded-0 py-32 px-16 sm:p-48 sm:rounded-2xl sm:shadow">
        <div className="w-full max-w-320 sm:w-320 mx-auto sm:mx-0">
          <img src="assets/images/logo/logo-image.png" alt="logo" />

          {/* <Typography className="mt-32 text-4xl font-extrabold tracking-tight leading-tight">
            Almost there!
          </Typography>
          <Typography className="mt-2">
            Do you want to be notified when we are ready? Register below so we can notify you about
            the launch!
          </Typography> */}
          {/* 
          <div className="flex flex-col items-center py-48">
            <FuseCountdown endDate="2023-07-28" />
          </div> */}

          <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
            className=" w-100 flex "
            style={{ flexWrap: 'wrap', alignItems: 'left' }}
          >
            {detailsList?.map((item) => (
              <div
                key={item.title}
                style={{
                  width: '50%',
                  display: 'flex-col',
                  color: 'secondary',
                }}
              >
                <div className="flex items-center">
                  <FuseSvgIcon className="text-32" size={24} color="secondary">
                    {item?.icon}
                  </FuseSvgIcon>
                  <Typography className="text-16 " color="secondary">
                    {item?.title}
                  </Typography>
                </div>
                <div>
                  <Typography className="text-16 mt-16 mb-16">
                    {item?.value}
                  </Typography>
                </div>
              </div>
            ))}

            <div
              id="bodymap"
              style={{ width: '320px', height: '160px', border: 'solid 0.2px' }}
            ></div>
          </motion.div>

          {/* <Typography className="mt-32 text-md font-medium" color="text.secondary">
              This isn't a newsletter subscription. We will send one email to you when we launch and
              then you will be removed from the list.
            </Typography> */}
        </div>
      </Paper>
    </div>
  )
}

export default BedSheetPage
