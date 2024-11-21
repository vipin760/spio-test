import FusePageCarded from '@fuse/core/FusePageCarded'
import withReducer from 'app/store/withReducer'
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery'
import reducer from '../../store'
import ProductsHeader from './ProductsHeader'
import ProductsTable from './ProductsTable'
import { Outlet } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useDeepCompareEffect } from '@fuse/hooks';
import FusePageSimple from '@fuse/core/FusePageSimple';
import { styled } from '@mui/material/styles';
const Root = styled(FusePageSimple)(({ theme }) => ({
  '& .FusePageSimple-header': {
    backgroundColor: theme.palette.background.paper,
  },
}));
function Products() {
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
      rightSidebarOnClose={() => setRightSidebarOpen(false)}
      rightSidebarWidth={640}
      scroll={isMobile ? 'normal' : 'content'}
    />
    
  )
  // <FusePageCarded
  //     header={<ProductsHeader />}
  //     content={<ProductsTable />}
  //     scroll={isMobile ? 'normal' : 'content'}
  //   />
}

export default withReducer('userDatabase', reducer)(Products)
