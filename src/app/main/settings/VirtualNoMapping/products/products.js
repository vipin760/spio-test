import FusePageCarded from '@fuse/core/FusePageCarded'
import withReducer from 'app/store/withReducer'
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery'
// import reducer from '../../../../store'
import { Outlet, useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import FusePageSimple from '@fuse/core/FusePageSimple';
import { styled } from '@mui/material/styles';
import ProductsTable from './productsTable';
import ProductsHeader from './productsHeader';
import { selectUser } from 'app/store/userSlice';
import { getProduct } from '../store/productSlice';
import reducer from '../store';
import { getOneProduct } from '../store/productsSlice';


const Root = styled(FusePageSimple)(({ theme }) => ({
  '& .FusePageSimple-header': {
    backgroundColor: theme.palette.background.paper,
  },
}));

function Products() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'))
  const routeParams = useParams();
  const pageLayout = useRef(null);
  const [rightSidebarOpen, setRightSidebarOpen] = useState(false);
  const [userType, setUserType] = useState(2)

  const user = useSelector(selectUser)

  useEffect(() => {
    setRightSidebarOpen(Boolean(routeParams.id));
  }, [routeParams]);

  useEffect(() => {
    if (!routeParams.id) {
      virtualMapItems();
    }
    setRightSidebarOpen(Boolean(routeParams.id));
  }, [routeParams]);
  useEffect(() => {
    virtualMapItems();
  }, [userType]);


  const virtualMapItems = () => {
    dispatch(getProduct())
  }

  // console.log("routeParams",routeParams?.id);
  

  // useEffect(() => {
  //   dispatch(getOneProduct(routeParams?.id))
  // }, [dispatch])

  return (
    <Root
      header={<ProductsHeader pageLayout={pageLayout} />}
      content={<ProductsTable />}
      ref={pageLayout}
      rightSidebarContent={<Outlet />}
      rightSidebarOpen={rightSidebarOpen}
      rightSidebarOnClose={() => {
        if (routeParams.id) {
          navigate(-1)
        }
        setRightSidebarOpen(false)
      }}
      rightSidebarWidth={640}
      scroll={isMobile ? 'normal' : 'content'}
    />
  )
}

export default withReducer('virtualNoMapping', reducer)(Products)





































// import FusePageCarded from '@fuse/core/FusePageCarded'
// import withReducer from 'app/store/withReducer'
// import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery'
// import reducer from '../../../../store'

// import { Outlet, useNavigate } from 'react-router-dom';
// import { useEffect, useRef, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useParams } from 'react-router-dom';
// import FusePageSimple from '@fuse/core/FusePageSimple';
// import { styled } from '@mui/material/styles';
// import ProductsTable from './productsTable';
// import ProductsHeader from './productsHeader';
// import { useForm } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';

// const Root = styled(FusePageSimple)(({ theme }) => ({
//   '& .FusePageSimple-header': {
//     backgroundColor: theme.palette.background.paper,
//   },
// }));

// function Products() {
//   const navigate = useNavigate()
//   const dispatch = useDispatch()
//   const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'))
//   const routeParams = useParams();
//   const pageLayout = useRef(null);
//   const [rightSidebarOpen, setRightSidebarOpen] = useState(false);

//   useEffect(() => {
//     setRightSidebarOpen(Boolean(routeParams.id));
//   }, [routeParams]);

  

//   return (
//     <Root
//       header={<ProductsHeader pageLayout={pageLayout} />}
//       content={<ProductsTable />}
//       ref={pageLayout}
//       rightSidebarContent={<Outlet />}
//       rightSidebarOpen={rightSidebarOpen}
//       rightSidebarOnClose={() => {
//         if (routeParams.id) {
//           navigate(-1)
//         }
//         setRightSidebarOpen(false)
//       }}
//       rightSidebarWidth={640}
//       scroll={isMobile ? 'normal' : 'content'}
//     />
//   )
// }

// export default withReducer('virtualNoMapping', reducer)(Products)
