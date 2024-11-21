import FusePageCarded from '@fuse/core/FusePageCarded'
import withReducer from 'app/store/withReducer'
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery'

import { Outlet, useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import FusePageSimple from '@fuse/core/FusePageSimple';
import { styled } from '@mui/material/styles';
import ProductsTable from './productsTable';
import ProductsHeader from './productsHeader';
import reducer from '../store';

const Root = styled(FusePageSimple)(({ theme }) => ({
  '& .FusePageSimple-header': {
    backgroundColor: theme.palette.background.paper,
  },
}));

function Products() {
  const navigate=useNavigate()
  const dispatch = useDispatch()
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'))
  const routeParams = useParams();
  const pageLayout = useRef(null);
  const [rightSidebarOpen, setRightSidebarOpen] = useState(false);
  
  useEffect(() => {
    setRightSidebarOpen(Boolean(routeParams.id));
  }, [routeParams]);

  return (
    <Root
    header={<ProductsHeader pageLayout={pageLayout} />}
    content={<ProductsTable />}
    ref={pageLayout}
    rightSidebarContent={<Outlet />}
    rightSidebarOpen={rightSidebarOpen}
    rightSidebarOnClose={() => {
      if(routeParams.id){
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
