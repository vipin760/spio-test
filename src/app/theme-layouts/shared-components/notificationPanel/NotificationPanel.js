import FuseScrollbars from '@fuse/core/FuseScrollbars'
import { styled } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import SwipeableDrawer from '@mui/material/SwipeableDrawer'
import Typography from '@mui/material/Typography'
import withReducer from 'app/store/withReducer'
import { useSnackbar } from 'notistack'
import { memo, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import FuseSvgIcon from '@fuse/core/FuseSvgIcon'
import Button from '@mui/material/Button'
import NotificationTemplate from 'app/theme-layouts/shared-components/notificationPanel/NotificationTemplate'
import NotificationModel from './model/NotificationModel'
import NotificationCard from './NotificationCard'
import {
  addNotification,
  dismissAll,
  dismissItem,
  getNotifications,
  selectNotifications,
} from './store/dataSlice'
import { getBeds, bedsList } from './store/alarms'
import reducer from './store'
import {
  closeNotificationPanel,
  selectNotificationPanelState,
  toggleNotificationPanel,
} from './store/stateSlice'

const StyledSwipeableDrawer = styled(SwipeableDrawer)(({ theme }) => ({
  '& .MuiDrawer-paper': {
    backgroundColor: theme.palette.background.default,
    width: 320,
  },
}))

function NotificationPanel(props) {
  const location = useLocation()
  const dispatch = useDispatch()
  const state = useSelector(selectNotificationPanelState)
  const notifications = useSelector(selectNotifications)
  const bedsIdsList = useSelector(bedsList)
  const navigate = useNavigate()
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()
  const initDataLoading = async () => {
    await dispatch(getBeds())
  }
  useEffect(() => {
    dispatch(getNotifications(bedsIdsList?.map((bed) => bed._id)))
  }, [bedsIdsList])

  useEffect(() => {
    /*
    Get Notifications from db
     */
    initDataLoading()
  }, [dispatch])

  useEffect(() => {
    if (state) {
      dispatch(closeNotificationPanel())
    }
    // eslint-disable-next-line
  }, [location, dispatch])

  function handleClose() {
    dispatch(closeNotificationPanel())
  }

  function handleDismiss(id) {
    dispatch(dismissItem(id))
  }
  function handleDismissAll() {
    dispatch(dismissAll())
  }

  return (
    <StyledSwipeableDrawer
      open={state}
      anchor="right"
      onOpen={(ev) => {}}
      onClose={(ev) => dispatch(toggleNotificationPanel())}
      disableSwipeToOpen
    >
      Z
      {notifications.length > 0 ? (
        <FuseScrollbars className="p-16">
          <div className="flex flex-col">
            <div className="flex justify-between items-end pt-136 mb-36">
              <Typography className="text-28 font-semibold leading-none">
                Notifications
              </Typography>
              <Typography
                className="text-12 underline cursor-pointer"
                color="secondary"
                onClick={handleDismissAll}
              >
                dismiss all
              </Typography>
            </div>
            {notifications.map((item) => (
              <NotificationCard
                key={item.id}
                className="mb-16"
                item={{
                  ...item,
                  icon: 'heroicons-outline:bell',
                  title:
                    item.title ||
                    `${item?.bed?.name} ${[
                      item?.absenceStatus && 'absence',
                      item?.ulCerStatus && 'ulcer',
                    ]
                      ?.filter((name) => name)
                      .join(', ')}`,
                  description: `${[
                    item?.room?.name,
                    item?.floor?.name,
                    item?.branch?.branch_name,
                  ]
                    .filter((name) => name)
                    ?.join(', ')}`,
                }}
                onClick={() => {
                  navigate(`/beds/${item?.bed?._id}`)
                }}
                onClose={handleDismiss}
              />
            ))}
          </div>
        </FuseScrollbars>
      ) : (
        <div className="flex flex-1 items-center justify-center p-16">
          <Typography className="text-24 text-center" color="text.secondary">
            There are no notifications for now.
          </Typography>
        </div>
      )}
      {/* <div className="flex items-center justify-center py-16">
        <Button size="small" variant="outlined" onClick={demoNotification}>
          Create a notification example
        </Button>
      </div> */}
    </StyledSwipeableDrawer>
  )
}

export default withReducer(
  'notificationPanel',
  reducer,
)(memo(NotificationPanel))
