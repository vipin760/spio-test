import FusePageSimple from '@fuse/core/FusePageSimple'
import withReducer from 'app/store/withReducer'
import { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useDeepCompareEffect } from '@fuse/hooks'
import { styled } from '@mui/material/styles'
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery'
import UsersSidebarContent from './UsersSidebarContent'
import UsersHeader from './UsersHeader'
import UsersList from './UsersList'
import reducer from './store'
import { getTags } from './store/tagsSlice'
import { getCountries } from './store/countriesSlice'
import { getUsers } from './store/usersSlice'

const Root = styled(FusePageSimple)(({ theme }) => ({
  '& .FusePageSimple-header': {
    backgroundColor: theme.palette.background.paper,
  },
}))

function ContactsApp(props) {
  const dispatch = useDispatch()
  const pageLayout = useRef(null)
  const routeParams = useParams()
  const [rightSidebarOpen, setRightSidebarOpen] = useState(false)
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'))

  useDeepCompareEffect(() => {
    dispatch(getCountries())
    dispatch(getTags())
  }, [dispatch])

  useEffect(() => {
    setRightSidebarOpen(Boolean(routeParams.id))
  }, [routeParams])

  return (
    <Root
      header={<UsersHeader pageLayout={pageLayout} />}
      content={<UsersList />}
      ref={pageLayout}
      rightSidebarContent={<UsersSidebarContent />}
      rightSidebarOpen={rightSidebarOpen}
      rightSidebarOnClose={() => setRightSidebarOpen(false)}
      rightSidebarWidth={640}
      scroll={isMobile ? 'normal' : 'content'}
    />
  )
}

export default withReducer('contactsApp', reducer)(ContactsApp)
