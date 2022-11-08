import { useQuery } from 'react-query';
import { CartType, GET_CART } from './../../graphql/cart';
import { graphqlFetcher, QueryKeys } from "../../queryClient";
import CartList from './../../components/cart/index';

const Cart = () => {
  const { data } = useQuery(QueryKeys.CART, ()=> graphqlFetcher(GET_CART));
  console.log(data)
  
  const cartItems = Object.values(data || {}) as CartType[];

  if(!cartItems.length) return <div>장바구니가 비었어요.</div>

  return (
    <CartList items={cartItems}/>
  )
};

export default Cart;