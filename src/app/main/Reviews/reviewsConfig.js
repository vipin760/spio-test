import Reviews from './reviews'
import Product from './product';


const reviewsConfig = {
    settings: {
      layout: {},
    },
    routes: [
      {
        path: 'views',
        element: <Product />,
      }
    ],
  };
  
  export default reviewsConfig;
