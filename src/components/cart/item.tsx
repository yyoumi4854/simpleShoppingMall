import React from 'react';
import { Cart } from '../../graphql/cart';

const CartItem = ({ id, imageUrl, price, title, amount }: Cart) => {
  return (
    <li>
      {id} {imageUrl} {price} {title} {amount}
    </li>
  );
};

export default CartItem;