import { useQuery } from 'react-query';
import { fetcher, QueryKeys } from './../../queryClient';

import ProductItem from './../../components/product/item';
import { Product } from '../../types';

const ProductList = () => {
  const { data } = useQuery<Product[]>(QueryKeys.PRODUCTS, () => fetcher({
    method: 'GET',
    path: '/products'
  }));

  return (
    <ul className='products'>
      {data?.map(product =>(
        <ProductItem {...product} key={product.id} />
      ))}
    </ul>
  );
};

export default ProductList;