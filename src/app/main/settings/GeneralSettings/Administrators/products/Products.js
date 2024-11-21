import FusePageCarded from '@fuse/core/FusePageCarded'
import withReducer from 'app/store/withReducer'
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery'
import reducer from '../store'
import ProductsHeader from './ProductsHeader'
import ProductsTable from './ProductsTable'
import FusePageSimple from '@fuse/core/FusePageSimple';
import { styled } from '@mui/material/styles';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { selectUser } from 'app/store/userSlice'
import { getAdminUsers } from '../store/productsSlice'

const Root = styled(FusePageSimple)(({ theme }) => ({
  '& .FusePageSimple-header': {
    backgroundColor: theme.palette.background.paper,
  },
}));
const schema = yup.object().shape({
  userType: yup
    .object()
    .required('You must enter a product name')
})
function Products() {

  const dispatch = useDispatch();
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'))
  const routeParams = useParams();
  const navigate = useNavigate();
  const pageLayout = useRef(null);
  const [rightSidebarOpen, setRightSidebarOpen] = useState(false);
  const [userType, setUserType] = useState(2)
  const user = useSelector(selectUser)

  const methods = useForm({
    mode: 'onChange',
    defaultValues: {},
    resolver: yupResolver(schema),
  })

  useEffect(() => {
    if (!routeParams.id) {
      getUsersList();
    }
    setRightSidebarOpen(Boolean(routeParams.id));
  }, [routeParams]);
  useEffect(() => {
    getUsersList();
  }, [userType]);


  const getUsersList = () => {
    const params = {
      "startIndex": 0,
      "lastIndex": 0,
      "institutionMasterId": user?.data?.institutionMasterId,
      "userType": userType
    }
    dispatch(getAdminUsers(params))
  }

  return (
    <FormProvider {...methods}>
      <Root
        header={<ProductsHeader pageLayout={pageLayout} userType={userType} setUserType={setUserType} />}
        content={<ProductsTable />}
        ref={pageLayout}
        rightSidebarContent={<Outlet />}
        rightSidebarOpen={rightSidebarOpen}
        rightSidebarOnClose={() => {
          if (routeParams.id) {
            navigate(-1);
          }
          setRightSidebarOpen(false)
        }}
        rightSidebarWidth={640}
        scroll={isMobile ? 'normal' : 'content'}
      />
    </FormProvider>
  )
  // <FusePageCarded
  //     header={<ProductsHeader />}
  //     content={<ProductsTable />}
  //     scroll={isMobile ? 'normal' : 'content'}
  //   />
}

export default withReducer('adminUsers', reducer)(Products)
