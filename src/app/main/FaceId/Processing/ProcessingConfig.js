import Product from './Product/Product';


const ProcessingConfig = {
    settings: {
      layout: {},
    },
    routes: [
      {
        path: 'processing',
        element: <Product />,
      }
    ],
  };
  
  export default ProcessingConfig;
